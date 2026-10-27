(() => {
  const localSounds = [
    "ringtone.wav",
    "outgoing-call.wav",
    "connecting.wav",
    "connected.wav",
    "call-ended.wav",
  ];

  class AudioManager {
    constructor() {
      this.context = null;
      this.buffers = new Map();
      this.loads = new Map();
      this.channels = new Map();
      this.callChannels = new Set([
        "incoming-ringtone",
        "outgoing-ringback",
        "reconnecting",
        "connected",
        "call-ended",
      ]);
    }

    getContext() {
      if (!this.context) {
        const Context = window.AudioContext || window.webkitAudioContext;
        if (!Context) throw new Error("Web Audio не поддерживается этим браузером.");
        this.context = new Context();
      }
      return this.context;
    }

    async unlock() {
      const context = this.getContext();
      if (context.state !== "running") await context.resume();
      return context;
    }

    async load(fileName) {
      if (this.buffers.has(fileName)) return this.buffers.get(fileName);
      if (!this.loads.has(fileName)) {
        const load = fetch(new URL(`./sounds/${fileName}`, document.baseURI))
          .then((response) => {
            if (!response.ok) throw new Error(`Не удалось загрузить ${fileName}: HTTP ${response.status}`);
            return response.arrayBuffer();
          })
          .then((data) => this.getContext().decodeAudioData(data))
          .then((buffer) => {
            this.buffers.set(fileName, buffer);
            return buffer;
          })
          .catch((error) => {
            this.loads.delete(fileName);
            throw error;
          });
        this.loads.set(fileName, load);
      }
      return this.loads.get(fileName);
    }

    preload() {
      return Promise.all(localSounds.map((fileName) => this.load(fileName)));
    }

    stop(channel) {
      const entry = this.channels.get(channel);
      if (!entry) return;
      this.channels.delete(channel);
      entry.sources.forEach((source) => {
        try {
          source.stop();
        } catch {}
        try {
          source.disconnect();
        } catch {}
      });
      entry.gains.forEach((gain) => gain.disconnect());
    }

    stopCallEffects({ preserveEnded = false } = {}) {
      for (const channel of [...this.channels.keys()]) {
        if (!this.callChannels.has(channel)) continue;
        if (preserveEnded && channel === "call-ended") continue;
        this.stop(channel);
      }
    }

    stopAll() {
      for (const channel of [...this.channels.keys()]) this.stop(channel);
    }

    async play(fileName, { channel = fileName, loop = false, volume = 0.4 } = {}) {
      this.stop(channel);
      const entry = { fileName, loop, sources: [], gains: [] };
      this.channels.set(channel, entry);

      try {
        const [buffer, context] = await Promise.all([this.load(fileName), this.unlock()]);
        if (this.channels.get(channel) !== entry) return null;
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        source.loop = loop;
        gain.gain.value = volume;
        source.connect(gain);
        gain.connect(context.destination);
        entry.sources.push(source);
        entry.gains.push(gain);
        source.onended = () => {
          if (!loop && this.channels.get(channel) === entry) this.channels.delete(channel);
          try {
            source.disconnect();
            gain.disconnect();
          } catch {}
        };
        source.start();
        return source;
      } catch (error) {
        if (this.channels.get(channel) === entry) this.channels.delete(channel);
        throw error;
      }
    }

    async playMessageBeep() {
      const channel = "message:beep";
      this.stop(channel);
      const context = await this.unlock();
      const entry = { sources: [], gains: [] };
      this.channels.set(channel, entry);
      const gain = context.createGain();
      const oscillator = context.createOscillator();
      const now = context.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.065, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.setValueAtTime(1174, now + 0.12);
      oscillator.connect(gain);
      gain.connect(context.destination);
      entry.sources.push(oscillator);
      entry.gains.push(gain);
      oscillator.onended = () => {
        if (this.channels.get(channel) === entry) this.channels.delete(channel);
        oscillator.disconnect();
        gain.disconnect();
      };
      oscillator.start(now);
      oscillator.stop(now + 0.28);
    }
  }

  window.SVOYSVYAZ_AUDIO = new AudioManager();
})();
