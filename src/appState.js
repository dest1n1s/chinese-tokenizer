import tokenizer from 'chinese-tokenizer'

export const initState = {
    loading: 0,
    cedictData: null,
    tokenize: null,
    input: '',
    type: 'simplified',
    highlightHistory: [],
    highlightIndex: 0
}

export function commitDictionary(state, data) {
    return {
        loading: Infinity,
        cedictData: data,
        tokenize: tokenizer.load(data)
    }
}

export function updateProgress(state, value) {
    if (value === state.loading) return {}
    return {loading: value}
}

export function updateInput(state, value) {
    if (value === state.input) return {}
    return {input: value}
}

export function updateType(state, value) {
    if (value === state.type) return {}
    return {type: value}
}

export function updateHighlight(state, token) {
    if (
        token != null
        && state.highlightHistory[state.highlightIndex] != null
        && token.traditional === state.highlightHistory[state.highlightIndex].traditional
    ) return {}

    let newHistory = state.highlightHistory.slice(0, state.highlightIndex + 1)
    if (token != null) newHistory.push(token)

    return {
        highlightHistory: newHistory,
        highlightIndex: token != null ? newHistory.length - 1 : newHistory.length
    }
}

export function goBackHighlight(state) {
    return {
        highlightIndex: Math.max(state.highlightIndex - 1, 0)
    }
}

export function goForwardHighlight(state) {
    return {
        highlightIndex: Math.min(state.highlightIndex + 1, state.highlightHistory.length - 1)
    }
}

export function clearHighlight(state) {
    return updateHighlight(state, null)
}
