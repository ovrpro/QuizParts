# QuizParts Interaction Architecture — Review Checklist

## Schema
- [x] `QuizQuestion` union includes: multiple_choice, multi_select, text_input, match_pairs, order_items, sentence_builder
- [x] Per-type fields: prompt, inputs, answer, feedback/explanation
- [x] sentence_builder

## Core
- [x] `QuestionInputState`: selectedChoiceId, selectedChoiceIds, text, matchPairs, orderedIds, sentenceOrder
- [x] Actions: selectChoice, toggleChoice, setTextInput, setMatchPairs, setOrderedIds, setSentenceOrder, submitAnswer
- [x] checkCorrectness handles all six types
- [x] sentence_builder

## React
- [x] Primitives delegate to context/hooks (no duplicated engine logic)
- [x] Context exposes: toggleChoice, setMatchPairs, setOrderedIds, setSentenceOrder
- [x] useQuestion: matchPairs, orderedIds, sentenceOrder and setters; Choice uses toggleChoice for multi_select
- [x] QuizRunner: render match_pairs (MatchPairs), order_items (OrderList), sentence_builder (SentenceBuilder)

## Accessibility (Phase 10)
- [x] MatchPairs, OrderList, SentenceBuilder: role="group", aria-label or aria-labelledby where appropriate
- [x] Choice: keyboard (Enter/Space), aria-selected
- [x] Buttons focusable by default; logical tab order
