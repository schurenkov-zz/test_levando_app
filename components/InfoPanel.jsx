import React from "react";

import { Button } from "react-bootstrap";

export default props => {
  const { all, active, red, green } = props;
  return (
    <div className="info">
      <p>Общее количество блоков: {all}</p>
      <p>Количество выделенных блоков: {active}</p>
      <p>Красных блоков: {red}</p>
      <p>Зеленых блоков: {green}</p>
      <Button bsStyle="primary" onClick={e => props.newBlock(e)}>
        Добавить блок
      </Button>
    </div>
  );
};
