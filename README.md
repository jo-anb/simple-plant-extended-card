![Preview of the card](preview.png)

# Simple Plant Extended Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

Simple Plant Extended Card is a custom dashboard card for the [Simple Plant Extended integration](https://github.com/jo-anb/simple-plant-extended) based on the [Simple Plant Card](https://github.com/jo-anb/simple-plant-card) from @ndesgranges

This repository exists only to allow installation through HACS (which does not allow both an integration and custom card in the same repository)

For any issue regarding this custom card, please report it in [the main repository](https://github.com/jo-anb/simple-plant-extended).

## Installation


[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jo-anb&repository=simple-plant-extended-card&category=plugin)

OR

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant
3. On the top right side, click the three dot and click `Custom repositories`
4. Where asked for a URL, paste the link of this repository:
https://github.com/jo-anb/simple-plant-extended-card
1. Where asked for a type, select `dashboard`
2. Click the download button. ⬇️

## Development

### Building

```bash
npm install
npm run build
```

### Releasing

This project uses [semantic-release](https://semantic-release.gitbook.io/) for automated releases.

**Important**: Follow [Conventional Commits](https://www.conventionalcommits.org/) format for your commit messages:
- `feat:` - New feature (triggers minor version bump)
- `fix:` - Bug fix (triggers patch version bump)
- `docs:` - Documentation changes (no version bump)
- `chore:` - Maintenance tasks (no version bump)

#### To create a release:

1. Make sure you have a `.env` file with your `GH_TOKEN`:
   ```
   GH_TOKEN=your_github_token_here
   ```

2. Run the release command:
   ```bash
   npm run release
   ```

   Or for a dry run to see what would happen:
   ```bash
   npm run release:dry
   ```

This will automatically:
- Analyze commits since the last release
- Determine the next version number
- Update package.json and package-lock.json
- Generate/update CHANGELOG.md
- Create a git commit and tag
- Push to GitHub
- Create a GitHub release
