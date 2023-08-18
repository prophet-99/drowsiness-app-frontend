export const generateSoundAlertUtil = () => {
  const context = new AudioContext();

  const oscillator = context.createOscillator();
  oscillator.type = 'sine'; // Tipo de onda (puedes probar con 'sine', 'square', 'sawtooth', 'triangle')
  oscillator.frequency.setValueAtTime(440, context.currentTime); // Frecuencia en Hz

  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(1, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + 0.5);
};
