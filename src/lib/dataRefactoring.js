const minifyJSON = json => {
  const moves = json.moves.reduce((moves, obj) => {
    const name = obj.move.name;
    const url = obj.move.url;
    const method = obj.version_group_details[0].move_learn_method.name;
    const move = {
      name,
      url,
      method
    };
    moves.push(move);
    return moves;
  },[]);

  const abilities = json.abilities.reduce((abilities, obj) => {
    abilities.push(obj.ability.name);
    return abilities;
  },[]);

  return {
    id: json.id,
    height: json.height,
    weight: json.weight,
    form: json.forms.url,
    specie: json.species.url,
    abilities: abilities,
    moves: moves
  };
};


//  EXPORTS
module.exports = {
    minifyJSON,
};
