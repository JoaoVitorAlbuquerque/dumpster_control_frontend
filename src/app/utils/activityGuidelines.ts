export function getActivityGuidelines(activity: string) {
  const rules: Record<string, any> = {
    CONSTRUCTION: {
      title: "Entulho de Construção",
      allowed: ["Tijolos", "Concreto", "Telhas", "Pisos e azulejos"],
      forbidden: ["Lixo doméstico", "Produtos químicos", "Pneus", "Baterias"],
    },

    TREE: {
      title: "Restos de Poda",
      allowed: ["Galhos", "Folhas", "Restos de poda"],
      forbidden: ["Troncos grandes", "Terra", "Raízes"],
    },

    CLEANING: {
      title: "Móveis",
      allowed: ["Sofás", "Colchões", "Mesas", "Armários"],
      forbidden: ["Entulho pesado", "Produtos químicos"],
    },

    GROUND: {
      title: "Limpeza de Terreno",
      allowed: ["Restos de vegetação", "Terra", "Pedras"],
      forbidden: ["Entulho pesado", "Produtos químicos"],
    },

    // CLEANING: {
    //   title: "Limpeza Geral",
    //   allowed: ["Objetos domésticos", "Pequenos móveis", "Restos de limpeza"],
    //   forbidden: ["Material hospitalar", "Resíduos tóxicos"],
    // },
  };

  return rules[activity];
}
