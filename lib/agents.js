export const agents = {
  "AG-MOE01": {
    name: "Moe",
  },

  "AG-CLA02": {
    name: "Claudia",
  },

  "AG-RAY03": {
    name: "Ray",
  },

  "AG-ELI04": {
    name: "Elizabeth",
  },

  "AG-CAR05": {
    name: "Carla",
  },

  "AG-MAX06": {
    name: "Maxie",
  },

  "AG-MQU07": {
    name: "M.Qureshi",
  },

  "AG-GRE08": {
    name: "Gregory",
  },

  "AG-VIV09": {
    name: "Viviana",
  },

  "AG-LUI10": {
    name: "Luis",
  },

  "AG-RAZ11": {
    name: "Raza",
  },

  "AG-DAN12": {
    name: "Daniel",
  },
};

export function getAgentByCode(code) {
  if (!code) return null;

  return agents[code] || null;
}