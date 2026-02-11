import { describe, it, expect } from 'vitest';
import { getGitHubAvatarUrl, AVATAR_FALLBACK_SRC } from './avatar';

describe('getGitHubAvatarUrl', () => {
  it('returns valid URL for normal logins', () => {
    expect(getGitHubAvatarUrl('octocat')).toBe(
      'https://github.com/octocat.png'
    );
  });

  it('properly encodes logins with brackets (bots)', () => {
    // hivemoot[bot] -> hivemoot%5Bbot%5D
    expect(getGitHubAvatarUrl('hivemoot[bot]')).toBe(
      'https://github.com/hivemoot%5Bbot%5D.png'
    );
  });

  it('handles empty or null logins gracefully', () => {
    // @ts-expect-error - testing invalid input
    expect(getGitHubAvatarUrl(null)).toBe(AVATAR_FALLBACK_SRC);
    expect(getGitHubAvatarUrl('')).toBe(AVATAR_FALLBACK_SRC);
  });

  it('handles special characters in logins', () => {
    expect(getGitHubAvatarUrl('user name')).toBe(
      'https://github.com/user%20name.png'
    );
  });
});
