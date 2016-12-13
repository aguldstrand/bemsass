@echo OFF

nearleyc src\grammar.ne -o src\grammar.js && ^
nearley-railroad src\grammar.ne -o docs\grammar.html && ^
type sample.scss | nearley-test src\grammar.js