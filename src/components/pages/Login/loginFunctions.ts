export function validEmail(value: string) {
  if (/\S+@\S+\.\S+/.test(value)) {
    return true;
  }
  return "Digite um email válido";
}
