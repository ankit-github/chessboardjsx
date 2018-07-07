import React, { Component } from 'react';

import Piece from './Piece';
import Square from './Square';
import Notation from './Notation';
import { COLUMNS } from './helpers';
import Chessboard from './index';
import PhantomPiece from './PhantomPiece';

class Board extends Component {
  setSquareCoordinates = (x, y, square) =>
    this.setState({ [square]: { x, y } });

  getSquareCoordinates = (sourceSquare, targetSquare) => ({
    sourceSquare: this.state[sourceSquare],
    targetSquare: this.state[targetSquare]
  });

  showPhantom = ({ square, targetSquare, phantomPiece }) => {
    const isActivePiece = (square, targetSquare) =>
      targetSquare && targetSquare === square;

    return (
      phantomPiece &&
      phantomPiece[targetSquare] &&
      isActivePiece(square, targetSquare)
    );
  };

  hasPiece = (currentPosition, square) =>
    currentPosition &&
    Object.keys(currentPosition) &&
    Object.keys(currentPosition).includes(square);

  render() {
    let alpha = COLUMNS;
    let row = 8;
    let squareColor = 'white';
    console.log('top');

    return (
      <Chessboard.Consumer>
        {context => {
          if (context.orientation === 'black') row = 1;
          console.log('second');

          return (
            console.log('third') || (
              <div
                style={{ ...boardStyles(context.width), ...context.boardStyle }}
              >
                {[...Array(8)].map((_, r) => {
                  row = context.orientation === 'black' ? row + 1 : row - 1;

                  return (
                    console.log('four') || (
                      <div key={r.toString()} style={rowStyles}>
                        {[...Array(8)].map((_, col) => {
                          let square =
                            context.orientation === 'black'
                              ? alpha[7 - col] + (row - 1)
                              : alpha[col] + (row + 1);

                          if (col !== 0)
                            squareColor =
                              squareColor === 'black' ? 'white' : 'black';

                          return (
                            console.log('five') || (
                              <Square
                                key={col.toString()}
                                width={context.width}
                                square={square}
                                squareColor={squareColor}
                                setSquareCoordinates={this.setSquareCoordinates}
                                lightSquareStyle={context.lightSquareStyle}
                                darkSquareStyle={context.darkSquareStyle}
                                roughSquare={context.roughSquare}
                                selectedSquares={context.selectedSquares}
                                onMouseOverSquare={context.onMouseOverSquare}
                                onMouseOutSquare={context.onMouseOutSquare}
                                onHoverSquareStyle={context.onHoverSquareStyle}
                                selectedSquareStyle={
                                  context.selectedSquareStyle
                                }
                                id={context.id}
                                screenWidth={context.screenWidth}
                                screenHeight={context.screenHeight}
                              >
                                {this.hasPiece(
                                  context.currentPosition,
                                  square
                                ) ? (
                                  <Piece
                                    pieces={context.pieces}
                                    currentSquare={square}
                                    piece={context.currentPosition[square]}
                                    width={context.width}
                                    setPosition={context.setPosition}
                                    dropOffBoard={context.dropOffBoard}
                                    getSquareCoordinates={
                                      this.getSquareCoordinates
                                    }
                                    draggable={context.draggable}
                                    onDrop={context.onDrop}
                                    sourceSquare={context.sourceSquare}
                                    targetSquare={context.targetSquare}
                                    waitForTransition={
                                      context.waitForTransition
                                    }
                                    transitionDuration={
                                      context.transitionDuration
                                    }
                                    orientation={context.orientation}
                                    id={context.id}
                                    setTouchState={context.setTouchState}
                                    renderPieces={context.renderPieces}
                                    wasManuallyDropped={
                                      context.wasManuallyDropped
                                    }
                                  />
                                ) : null}

                                {this.showPhantom({
                                  square,
                                  targetSquare: context.targetSquare,
                                  phantomPiece: context.phantomPiece
                                }) && (
                                  <PhantomPiece
                                    width={context.width}
                                    phantomPieceValue={
                                      context.phantomPiece[context.targetSquare]
                                    }
                                    pieces={context.pieces}
                                    showNotation={context.showNotation}
                                  />
                                )}

                                {context.showNotation && (
                                  <Notation
                                    row={row}
                                    col={col}
                                    alpha={alpha}
                                    orientation={context.orientation}
                                    width={context.width}
                                    lightSquareStyle={context.lightSquareStyle}
                                    darkSquareStyle={context.darkSquareStyle}
                                  />
                                )}
                              </Square>
                            )
                          );
                        })}
                      </div>
                    )
                  );
                })}
              </div>
            )
          );
        }}
      </Chessboard.Consumer>
    );
  }
}

export default Board;

const boardStyles = width => ({
  width: width,
  height: width,
  cursor: 'default'
});

const rowStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  width: '100%'
};
