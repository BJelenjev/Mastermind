export const GUESS_INPUT_GIVEN = 'GUESS_INPUT_GIVEN'

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export default (gameId, combination) => {
  return (dispatchFn) => {
    dispatchFn({type: GUESS_INPUT_GIVEN, combination})

    // Simulate answer arriving later
    window.setTimeout(() =>{
      const guessReceivedAction = {
        type: 'GUESS_RECEIVED',
        payload: {
          isYours: true,
          numExact: randomInt(0,2),
          numApprox: randomInt(0,2), 
          combination
        }
      }
      dispatchFn(guessReceivedAction)
    }, 300)
  }
}
