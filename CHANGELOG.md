# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.8] - 2026-09-30

### Changed

- `engines.node` is now `>=20`. The shipped code is browser-only and does not
  need Node 22; only developing this repo does (see `.nvmrc`). Node 20 hosts
  could not install the package before.

### Removed

- The `prepare` script. Yarn 1 runs a full install of every devDependency for a
  Git dependency that has one. Without it, hosts download a plain archive of the
  repo, and `dist/` is already committed.
- `.yarnrc`, which only worked around the nested install above.

## [0.3.7] - 2026-09-29

### Changed

- The inverse marker on trig keys is a real 8px superscript `-1`, so the longest
  label (`cosec`) fits inside a key at a 12px font size.

## [0.3.6] - 2026-09-29

### Added

- The `theme` prop now covers every design variable (display, keypad spacing,
  button sizes and colours, selected angle unit, Invert Functions button, font
  family).
- `showModeToggle` prop. Hosts that lock the calculator to one mode pass
  `false` to omit the Basic/Scientific switch.

## [0.3.5] - 2026-09-29

### Changed

- Scientific keypad follows the assessment Figma frame: three groups (trig,
  functions, number pad), Rad/Grad/Deg on the bottom row, backspace and plus/minus
  icons, and design sizes exposed as CSS variables.

## [0.3.4] - 2026-09-29

### Added

- `Invert Functions` button. It swaps only the nine trig keys (sin, cos, tan,
  sinh, cosh, tanh, cosec, sec, cot) for their inverses.
- Separate `Rad`, `Grad` and `Deg` buttons with a selected state.
- Backspace key on the keypad.

### Changed

- Every other function has its own key; the `2nd` key and its captions are gone.

## [0.3.3] - 2026-09-28

### Fixed

- The package `types` entry pointed at a file the build does not emit, so
  `Calculator` props were not type-checked.

## [0.3.2] - 2026-09-28

### Fixed

- Yarn could not install the package as a Git dependency on a Node version that
  the dev tooling rejected.

## [0.3.1] - 2026-09-28

### Removed

- The private `@afixt/a11y-assert` devDependency, which is not on the public
  registry and stopped Yarn from installing this repo.

## [0.3.0] - 2026-09-28

Fork of `@afixt/a11y-calc` 0.2.2 for online assessments.

### Added

- Grad angle mode. The angle unit cycles Rad, Grad, Deg.
- `nth root`, `sec`, `cosec`, `cot`, their inverses, absolute value, `nCr` and
  `nPr`.
- `nCr` and `nPr` are computed without factorials, so `200 nCr 2` is `19900`.

### Fixed

- Opening a parenthesis glued the next digit to the previous value, so
  `2 × (3 + 4) =` gave `54`. It now gives `14`.
- `tan(90°)` and `sec(90°)` are errors, not huge numbers, and `sin(180°)` is
  exactly `0`.

## [0.2.2] - 2026-08-20

### Added

- `CHANGELOG.md` documenting the release history from v0.1.1 onward, in
  Keep a Changelog format, shipped in the published package. (#107)

### Security

- Override `puppeteer` to 25.6.0 to clear the unfixable `extract-zip` advisory
  ([GHSA-jmr9-qjv8-65gv](https://github.com/advisories/GHSA-jmr9-qjv8-65gv))
  inherited via `@afixt/a11y-assert` → `@afixt/afixt-engine`. `extract-zip` has
  no fixed version and no clean `puppeteer@24.x` exists, so the fix line starts
  at puppeteer 25 / `@puppeteer/browsers` 3, which drops the dependency
  entirely. Dev-only; the production tree was never affected. This override is
  a stopgap pending [afixt-engine#219](https://github.com/AFixt/afixt-engine/issues/219)
  and should be removed once the engine widens its declared range. (#106)

## [0.2.1] - 2026-08-20

### Changed

- Publish visibility is now explicit: `publishConfig.access` is set to `public`
  in `package.json`, so a bare `npm publish` is correct without relying on the
  `--access public` flag passed by CI. The package was already published
  publicly; this records the intent in the manifest and prevents a manual or
  local publish from defaulting to npm's `restricted` for scoped packages.
  (#102)

### Fixed

- Test suite no longer fails intermittently on slower machines. No
  `testTimeout` was configured, so tests ran on vitest's 5s default and
  `userEvent`-heavy component tests could exceed it under load. Now set to 20s.
  No assertions or component code changed. (#103)

## [0.2.0] - 2026-08-14

### Added

- Use-case coverage for the remaining scientific functions, the error path, and
  keyboard interaction (#83).
- PR-time validation gate for the `.uc.yaml` use-case suite (#92, #97).

### Fixed

- `CalculatorProps` is now exported from the package root (#93).
- E2E Tab-focus test aligned with the container focus order recorded in ADR
  0014 (#82).

### Changed

- Scheduled workflows removed; security and docs checks now run in PR-time CI
  (#84). `calculator.spec.ts` runs in CI, with a guard against a reused preview
  server (#87, #95).

### Security

- Patched vulnerable devDependency transitives flagged by osv-scanner (#81).

## [0.1.5] - 2026-07-22

### Fixed

- Color-contrast minimums and reflow on zoom (#69, #70).

### Removed

- `axe-core` and all tooling depending on it (#72).

### Security

- GitHub Actions pinned to commit SHAs; npm `min-release-age` set.
- `undici` overridden to `^7.28.0`; dev-only transitives patched.

## [0.1.4] - 2026-06-16

### Fixed

- Reliable keyboard focus; removed the verbose button fieldset (ADR 0014).
- CI: `NODE_AUTH_TOKEN` set on the npm publish step rather than on `npm ci`.

### Changed

- Dependabot version updates disabled (`dependabot.yml` removed).

### Added

- Calculator interactions documented in the usecase-runner DSL.

## [0.1.3] - 2026-05-28

### Fixed

- CI: scan tools installed before the pre-publish gates in `release.yml` (#57).

### Security

- `tmp` overridden to `>=0.2.6`; dev-only transitive vulnerabilities patched
  (#55).

## [0.1.2] - 2026-05-09

### Fixed

- Dropped an unnecessary `CSSProperties` type assertion.

### Changed

- npm authentication for the `@afixt` scope in CI (#38).
- Secret scanning switched from gitleaks to TruffleHog.

## [0.1.1] - 2026-05-01

### Added

- Initial release: accessible calculator React component with basic and
  scientific modes, styled after the macOS Calculator.
- `release.yml` for OIDC-based npm publish with provenance (#11).
- Tooling baseline: ESLint, Husky gates, size-limit, and CI workflows.

[Unreleased]: https://github.com/AFixt/a11y-calc/compare/v0.2.2...HEAD
[0.2.2]: https://github.com/AFixt/a11y-calc/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/AFixt/a11y-calc/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/AFixt/a11y-calc/compare/v0.1.5...v0.2.0
[0.1.5]: https://github.com/AFixt/a11y-calc/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/AFixt/a11y-calc/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/AFixt/a11y-calc/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/AFixt/a11y-calc/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/AFixt/a11y-calc/releases/tag/v0.1.1
