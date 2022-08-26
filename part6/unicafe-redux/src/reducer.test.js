import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok and bad is incremented', () => {
    const action = {
      type: 'OK'
    }
    const action2 = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const firstState = counterReducer(state, action)
    const secondState = counterReducer(firstState, action2)
    expect(secondState).toEqual({
      good: 0,
      ok: 1,
      bad: 1
    })
  })

  test('set zero button works', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 10,
      ok: 4,
      bad: 2
    }

    deepFreeze(state)

    expect(state).toEqual({
      good: 10,
      ok: 4,
      bad: 2
    })

    const firstState = counterReducer(state, action)
    expect(firstState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
  
})