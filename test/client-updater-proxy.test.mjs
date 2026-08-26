import test from 'node:test';
import assert from 'node:assert/strict';

import { githubProxyUrl, githubProxyUrls, downloadUrls, probeUrls } from '../client-updater.js';

const GITHUB_ASSET =
  'https://github.com/zouyuxuan122/Deepseek-Harness-EAC/releases/download/v4.4/Deepseek-Harness-EAC-Setup-x64.exe';
const GITEE_ASSET =
  'https://gitee.com/zouyuxuan122/Deepseek-Harness-EAC/releases/download/v4.4/Deepseek-Harness-EAC-Setup-x64.exe';

test('githubProxyUrl only proxies GitHub asset URLs', () => {
  assert.equal(
    githubProxyUrl(GITHUB_ASSET),
    'https://gh.geekertao.top/' + GITHUB_ASSET,
  );
  assert.equal(githubProxyUrl(GITEE_ASSET), null);
  assert.equal(githubProxyUrl('https://github.com.evil.example/download.exe'), null);
  assert.equal(githubProxyUrl(''), null);
});

test('githubProxyUrls returns all proxy candidates for GitHub URLs', () => {
  const urls = githubProxyUrls(GITHUB_ASSET);
  assert.equal(urls.length, 3);
  assert.ok(urls[0].startsWith('https://gh.geekertao.top/'));
  assert.ok(urls[1].startsWith('https://mirror.ghproxy.com/'));
  assert.ok(urls[2].startsWith('https://gh-proxy.com/'));
  // 非 GitHub URL 返回空数组
  assert.deepEqual(githubProxyUrls(GITEE_ASSET), []);
});

test('githubProxyUrls appends cache-busting params to each proxy', () => {
  const urls = githubProxyUrls(GITHUB_ASSET, { version: '4.4.1', sha256: 'abc123' });
  assert.equal(urls.length, 3);
  for (const u of urls) {
    assert.ok(u.includes('?v=4.4.1&sha256=abc123'), `expected cache-busting params in ${u}`);
  }
});

test('downloadUrls puts all proxies before GitHub and other fallback sources', () => {
  const urls = downloadUrls(GITHUB_ASSET, [GITEE_ASSET]);
  assert.ok(urls[0].startsWith('https://gh.geekertao.top/'));
  assert.ok(urls[1].startsWith('https://mirror.ghproxy.com/'));
  assert.ok(urls[2].startsWith('https://gh-proxy.com/'));
  assert.equal(urls[3], GITHUB_ASSET);
  assert.equal(urls[4], GITEE_ASSET);
});

test('downloadUrls keeps non-GitHub sources unchanged and removes duplicates', () => {
  assert.deepEqual(downloadUrls(GITEE_ASSET, [GITEE_ASSET, '']), [GITEE_ASSET]);
});

test('githubProxyUrl appends cache-busting v+sha256 params (backward compat)', () => {
  assert.equal(
    githubProxyUrl(GITHUB_ASSET, { version: '4.4.1', sha256: 'abc123' }),
    'https://gh.geekertao.top/' + GITHUB_ASSET + '?v=4.4.1&sha256=abc123',
  );
});

test('githubProxyUrl appends only version when sha256 omitted', () => {
  assert.equal(
    githubProxyUrl(GITHUB_ASSET, { version: '4.4.1' }),
    'https://gh.geekertao.top/' + GITHUB_ASSET + '?v=4.4.1',
  );
});

test('githubProxyUrl without opts keeps plain concatenation (backward compatible)', () => {
  assert.equal(githubProxyUrl(GITHUB_ASSET), 'https://gh.geekertao.top/' + GITHUB_ASSET);
});

test('githubProxyUrl uses & when original URL already has a query', () => {
  assert.equal(
    githubProxyUrl(GITHUB_ASSET + '?foo=1', { version: '4.4.1', sha256: 'abc' }),
    'https://gh.geekertao.top/' + GITHUB_ASSET + '?foo=1&v=4.4.1&sha256=abc',
  );
});

test('githubProxyUrl encodes special characters in params', () => {
  assert.equal(
    githubProxyUrl(GITHUB_ASSET, { version: '4.4.1', sha256: 'a b/c' }),
    'https://gh.geekertao.top/' + GITHUB_ASSET + '?v=4.4.1&sha256=a%20b%2Fc',
  );
});

test('downloadUrls forwards cache-busting opts to all proxied URLs', () => {
  const urls = downloadUrls(GITHUB_ASSET, [GITEE_ASSET], { version: '4.4.1', sha256: 'abc' });
  assert.equal(urls.length, 5);
  for (let i = 0; i < 3; i++) {
    assert.ok(urls[i].includes('?v=4.4.1&sha256=abc'), `proxy URL ${i} missing cache-busting params`);
  }
  assert.equal(urls[3], GITHUB_ASSET);
  assert.equal(urls[4], GITEE_ASSET);
});

test('probeUrls returns input unchanged when given a single URL', async () => {
  const result = await probeUrls(['https://example.com/file.exe']);
  assert.deepEqual(result, ['https://example.com/file.exe']);
});

test('probeUrls returns input unchanged when given empty array', async () => {
  const result = await probeUrls([]);
  assert.deepEqual(result, []);
});
