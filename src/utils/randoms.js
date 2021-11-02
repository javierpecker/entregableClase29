
const getRandomInt = () => {
    return Math.floor(Math.random() * (1000 - 1)) + 1;
  };
  
  export const calculo = (qty) => {
    const salida = {};
    for (let i = 0; i < qty; i++) {
      const data = getRandomInt();
  
      if (salida[data]) salida[data] += 1;
      else salida[data] = 1;
    }
    return salida;
  };
  
  process.on("message", (qty) => {
    console.log("Start calculo");
    const salida = calculo(qty);
    process.send(salida);
  });