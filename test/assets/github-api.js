module.exports = [
  // OAuth Authorizations
  ['GET', '/authorizations', '/authorizations'],
  ['GET', '/authorizations/:id', '/authorizations/233'],
  ['POST', '/authorizations', '/authorizations'],
  ['PUT', '/authorizations/clients/:client_id', '/authorizations/clients/12345'],
  ['PATCH', '/authorizations/:id', '/authorizations/233'],
  ['DELETE', '/authorizations/:id', '/authorizations/377'],
  [
    'GET',
    '/applications/:client_id/tokens/:access_token',
    '/applications/233/tokens/12345tokens'
  ],
  ['DELETE', '/applications/:client_id/tokens', '/applications/377/tokens'],
  [
    'DELETE',
    '/applications/:client_id/tokens/:access_token',
    '/applications/610/tokens/5678tokens'
  ],

  // Activity
  ['GET', '/events', '/events'],
  ['GET', '/repos/:owner/:repo/events', '/repos/tinyio/router/events'],
  ['GET', '/networks/:owner/:repo/events', '/networks/tinyio/router/events'],
  ['GET', '/orgs/:org/events', '/orgs/tinyio/events'],
  ['GET', '/users/:user/received_events', '/users/fundon/received_events'],
  ['GET', '/users/:user/received_events/public', '/users/fundon/received_events/public'],
  ['GET', '/users/:user/events', '/users/fundon/events'],
  ['GET', '/users/:user/events/public', '/users/fundon/events/public'],
  ['GET', '/users/:user/events/orgs/:org', '/users/fundon/events/orgs/tinyio'],
  ['GET', '/feeds', '/feeds'],
  ['GET', '/notifications', '/notifications'],
  ['GET', '/repos/:owner/:repo/notifications', '/repos/tinyio/tiny/notifications'],
  ['PUT', '/notifications', '/notifications'],
  ['PUT', '/repos/:owner/:repo/notifications', '/repos/tinyio/router/notifications'],
  ['GET', '/notifications/threads/:id', '/notifications/threads/233'],
  ['PATCH', '/notifications/threads/:id', '/notifications/threads/233'],
  [
    'GET',
    '/notifications/threads/:id/subscription',
    '/notifications/threads/377/subscription'
  ],
  [
    'PUT',
    '/notifications/threads/:id/subscription',
    '/notifications/threads/610/subscription'
  ],
  [
    'DELETE',
    '/notifications/threads/:id/subscription',
    '/notifications/threads/233/subscription'
  ],
  ['GET', '/repos/:owner/:repo/stargazers', '/repos/tinyio/tiny/stargazers'],
  ['GET', '/users/:user/starred', '/users/fundon/starred'],
  ['GET', '/user/starred', '/user/starred'],
  ['GET', '/user/starred/:owner/:repo', '/user/starred/koa-modules/swig'],
  ['PUT', '/user/starred/:owner/:repo', '/user/starred/koa-modules/i18n'],
  ['DELETE', '/user/starred/:owner/:repo', '/user/starred/tinyio/router'],
  ['GET', '/repos/:owner/:repo/subscribers', '/repos/tinyio/router/subscribers'],
  ['GET', '/users/:user/subscriptions', '/users/fundon/subscriptions'],
  ['GET', '/user/subscriptions', '/user/subscriptions'],
  ['GET', '/repos/:owner/:repo/subscription', '/repos/tinyio/router-mapper/subscription'],
  ['PUT', '/repos/:owner/:repo/subscription', '/repos/tinyio/router-mapper/subscription'],
  [
    'DELETE',
    '/repos/:owner/:repo/subscription',
    '/repos/tinyio/router-mapper/subscription'
  ],
  ['GET', '/user/subscriptions/:owner/:repo', '/user/subscriptions/tinyio/tiny'],
  ['PUT', '/user/subscriptions/:owner/:repo', '/user/subscriptions/tinyio/tiny'],
  ['DELETE', '/user/subscriptions/:owner/:repo', '/user/subscriptions/tinyio/tiny'],

  // Gists
  ['GET', '/users/:user/gists', '/users/fundon/gists'],
  ['GET', '/gists', '/gists'],
  ['GET', '/gists/public', '/gists/public'],
  ['GET', '/gists/starred', '/gists/public'],
  ['GET', '/gists/:id', '/gists/233'],
  ['POST', '/gists', '/gists'],
  ['PATCH', '/gists/:id', '/gists/233'],
  ['PUT', '/gists/:id/star', '/gists/377/star'],
  ['DELETE', '/gists/:id/star', '/gists/610/star'],
  ['GET', '/gists/:id/star', '/gists/987/star'],
  ['POST', '/gists/:id/forks', '/gists/987/forks'],
  ['DELETE', '/gists/:id', '/gists/987'],

  // Git Data
  ['GET', '/repos/:owner/:repo/git/blobs/:sha', '/repos/tinyio/tiny/git/blobs/abcdefgh'],
  ['POST', '/repos/:owner/:repo/git/blobs', '/repos/tinyio/tiny/git/blobs'],
  [
    'GET',
    '/repos/:owner/:repo/git/commits/:sha',
    '/repos/tinyio/tiny/git/commits/abcdefgh'
  ],
  ['POST', '/repos/:owner/:repo/git/commits', '/repos/tinyio/tiny/git/commits'],
  ['GET', '/repos/:owner/:repo/git/refs/*ref', '/repos/tinyio/tiny/git/refs/asdf'],
  ['GET', '/repos/:owner/:repo/git/refs', '/repos/tinyio/tiny/git/refs'],
  ['POST', '/repos/:owner/:repo/git/refs', '/repos/tinyio/tiny/git/refs'],
  ['PATCH', '/repos/:owner/:repo/git/refs/*ref', '/repos/tinyio/tiny/git/refs/asdf'],
  ['DELETE', '/repos/:owner/:repo/git/refs/*ref', '/repos/tinyio/tiny/git/refs/asdf'],
  ['GET', '/repos/:owner/:repo/git/tags/:sha', '/repos/tinyio/tiny/git/tags/233'],
  ['POST', '/repos/:owner/:repo/git/tags', '/repos/tinyio/tiny/git/tags'],
  ['GET', '/repos/:owner/:repo/git/trees/:sha', '/repos/tinyio/tiny/git/trees/377'],
  ['POST', '/repos/:owner/:repo/git/trees', '/repos/tinyio/tiny/git/trees'],

  // Issues
  ['GET', '/issues', '/issues'],
  ['GET', '/user/issues', '/user/issues'],
  ['GET', '/orgs/:org/issues', '/orgs/tinyio/issues'],
  ['GET', '/repos/:owner/:repo/issues', '/repos/tinyio/tiny/issues'],
  ['GET', '/repos/:owner/:repo/issues/:number', '/repos/tinyio/tiny/issues/377'],
  ['POST', '/repos/:owner/:repo/issues', '/repos/tinyio/tiny/issues'],
  ['PATCH', '/repos/:owner/:repo/issues/:number', '/repos/tinyio/tiny/issues/377'],
  ['GET', '/repos/:owner/:repo/assignees', '/repos/tinyio/tiny/assignees'],
  [
    'GET',
    '/repos/:owner/:repo/assignees/:assignee',
    '/repos/tinyio/tiny/assignees/31231'
  ],
  [
    'GET',
    '/repos/:owner/:repo/issues/:number/comments',
    '/repos/tinyio/tiny/issues/610/comments'
  ],
  ['GET', '/repos/:owner/:repo/issues/comments', '/repos/tinyio/tiny/issues/comments'],
  [
    'GET',
    '/repos/:owner/:repo/issues/comments/:id',
    '/repos/tinyio/tiny/issues/comments/233'
  ],
  [
    'POST',
    '/repos/:owner/:repo/issues/:number/comments',
    '/repos/tinyio/tiny/issues/377/comments'
  ],
  [
    'PATCH',
    '/repos/:owner/:repo/issues/comments/:id',
    '/repos/tinyio/tiny/issues/comments/233'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/issues/comments/:id',
    '/repos/tinyio/tiny/issues/comments/233'
  ],
  [
    'GET',
    '/repos/:owner/:repo/issues/:number/events',
    '/repos/tinyio/tiny/issues/233/events'
  ],
  ['GET', '/repos/:owner/:repo/issues/events', '/repos/tinyio/tiny/issues/events'],
  [
    'GET',
    '/repos/:owner/:repo/issues/events/:id',
    '/repos/tinyio/tiny/issues/events/233'
  ],
  ['GET', '/repos/:owner/:repo/labels', '/repos/tinyio/tiny/labels'],
  ['GET', '/repos/:owner/:repo/labels/:name', '/repos/tinyio/tiny/labels/help'],
  ['POST', '/repos/:owner/:repo/labels', '/repos/tinyio/tiny/labels'],
  ['PATCH', '/repos/:owner/:repo/labels/:name', '/repos/tinyio/tiny/labels/hello'],
  ['DELETE', '/repos/:owner/:repo/labels/:name', '/repos/tinyio/tiny/labels/iojs'],
  [
    'GET',
    '/repos/:owner/:repo/issues/:number/labels',
    '/repos/tinyio/tiny/issues/388/labels'
  ],
  [
    'POST',
    '/repos/:owner/:repo/issues/:number/labels',
    '/repos/tinyio/tiny/issues/388/labels'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/issues/:number/labels/:name',
    '/repos/tinyio/tiny/issues/233/labels/help'
  ],
  [
    'PUT',
    '/repos/:owner/:repo/issues/:number/labels',
    '/repos/tinyio/tiny/issues/233/labels'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/issues/:number/labels',
    '/repos/tinyio/tiny/issues/399/labels'
  ],
  [
    'GET',
    '/repos/:owner/:repo/milestones/:number/labels',
    '/repos/tinyio/tiny/milestones/0/labels'
  ],
  ['GET', '/repos/:owner/:repo/milestones', '/repos/tinyio/tiny/milestones'],
  ['GET', '/repos/:owner/:repo/milestones/:number', '/repos/tinyio/tiny/milestones/1024'],
  ['POST', '/repos/:owner/:repo/milestones', '/repos/tinyio/tiny/milestones'],
  [
    'PATCH',
    '/repos/:owner/:repo/milestones/:number',
    '/repos/tinyio/tiny/milestones/1024'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/milestones/:number',
    '/repos/tinyio/tiny/milestones/233'
  ],

  // Miscellaneous
  ['GET', '/emojis', '/emojis'],
  ['GET', '/gitignore/templates', '/gitignore/templates'],
  ['GET', '/gitignore/templates/:name', '/gitignore/templates/233'],
  ['POST', '/markdown', '/markdown'],
  ['POST', '/markdown/raw', '/markdown/raw'],
  ['GET', '/meta', '/meta'],
  ['GET', '/rate_limit', '/rate_limit'],

  // Organizations
  ['GET', '/users/:user/orgs', '/users/fundon/orgs'],
  ['GET', '/user/orgs', '/user/orgs'],
  ['GET', '/orgs/:org', '/orgs/tinyio'],
  ['PATCH', '/orgs/:org', '/orgs/tinyio'],
  ['GET', '/orgs/:org/members', '/orgs/tinyio/members'],
  ['GET', '/orgs/:org/members/:user', '/orgs/tinyio/members/fundon'],
  ['DELETE', '/orgs/:org/members/:user', '/orgs/tinyio/members/fundon'],
  ['GET', '/orgs/:org/public_members', '/orgs/tinyio/public_members'],
  ['GET', '/orgs/:org/public_members/:user', '/orgs/tinyio/public_members/fundon'],
  ['PUT', '/orgs/:org/public_members/:user', '/orgs/tinyio/public_members/fundon'],
  ['DELETE', '/orgs/:org/public_members/:user', '/orgs/tinyio/public_members/fundon'],
  ['GET', '/orgs/:org/teams', '/orgs/tinyio/teams'],
  ['GET', '/teams/:id', '/teams/233'],
  ['POST', '/orgs/:org/teams', '/orgs/tinyio/teams'],
  ['PATCH', '/teams/:id', '/teams/233'],
  ['DELETE', '/teams/:id', '/teams/233'],
  ['GET', '/teams/:id/members', '/teams/233/members'],
  ['GET', '/teams/:id/members/:user', '/teams/233/members/fundon'],
  ['PUT', '/teams/:id/members/:user', '/teams/377/members/fundon'],
  ['DELETE', '/teams/:id/members/:user', '/teams/610/members/fundon'],
  ['GET', '/teams/:id/repos', '/teams/987/repos'],
  ['GET', '/teams/:id/repos/:owner/:repo', '/teams/987/repos/tinyio/tiny'],
  ['PUT', '/teams/:id/repos/:owner/:repo', '/teams/987/repos/tinyio/tiny'],
  ['DELETE', '/teams/:id/repos/:owner/:repo', '/teams/987/repos/tinyio/tiny'],
  ['GET', '/user/teams', '/user/teams'],

  // Pull Requests
  ['GET', '/repos/:owner/:repo/pulls', '/repos/tinyio/tiny/pulls'],
  ['GET', '/repos/:owner/:repo/pulls/:number', '/repos/tinyio/tiny/pulls/233'],
  ['POST', '/repos/:owner/:repo/pulls', '/repos/tinyio/tiny/pulls'],
  ['PATCH', '/repos/:owner/:repo/pulls/:number', '/repos/tinyio/tiny/pulls/233'],
  [
    'GET',
    '/repos/:owner/:repo/pulls/:number/commits',
    '/repos/tinyio/tiny/pulls/233/commits'
  ],
  [
    'GET',
    '/repos/:owner/:repo/pulls/:number/files',
    '/repos/tinyio/tiny/pulls/233/files'
  ],
  [
    'GET',
    '/repos/:owner/:repo/pulls/:number/merge',
    '/repos/tinyio/tiny/pulls/233/merge'
  ],
  [
    'PUT',
    '/repos/:owner/:repo/pulls/:number/merge',
    '/repos/tinyio/tiny/pulls/233/merge'
  ],
  [
    'GET',
    '/repos/:owner/:repo/pulls/:number/comments',
    '/repos/tinyio/tiny/pulls/233/comments'
  ],
  ['GET', '/repos/:owner/:repo/pulls/comments', '/repos/tinyio/tiny/pulls/comments'],
  [
    'GET',
    '/repos/:owner/:repo/pulls/comments/:number',
    '/repos/tinyio/tiny/pulls/comments/233'
  ],
  [
    'PUT',
    '/repos/:owner/:repo/pulls/:number/comments',
    '/repos/tinyio/tiny/pulls/233/comments'
  ],
  [
    'PATCH',
    '/repos/:owner/:repo/pulls/comments/:number',
    '/repos/tinyio/tiny/pulls/comments/:number'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/pulls/comments/:number',
    '/repos/tinyio/tiny/pulls/comments/:number'
  ],

  // Repositories
  ['GET', '/user/repos', '/user/repos'],
  ['GET', '/users/:user/repos', '/users/fundon/repos'],
  ['GET', '/orgs/:org/repos', '/orgs/tinyio/repos'],
  ['GET', '/repositories', '/repositories'],
  ['POST', '/user/repos', '/user/repos'],
  ['POST', '/orgs/:org/repos', '/orgs/tinyio/repos'],
  ['GET', '/repos/:owner/:repo', '/repos/tinyio/tiny'],
  ['PATCH', '/repos/:owner/:repo', '/repos/tinyio/tiny'],
  ['GET', '/repos/:owner/:repo/contributors', '/repos/tinyio/tiny/contributors'],
  ['GET', '/repos/:owner/:repo/languages', '/repos/tinyio/tiny/languages'],
  ['GET', '/repos/:owner/:repo/teams', '/repos/tinyio/tiny/teams'],
  ['GET', '/repos/:owner/:repo/tags', '/repos/tinyio/tiny/tags'],
  ['GET', '/repos/:owner/:repo/branches', '/repos/tinyio/tiny/branches'],
  ['GET', '/repos/:owner/:repo/branches/:branch', '/repos/tinyio/tiny/branches/master'],
  ['DELETE', '/repos/:owner/:repo', '/repos/tinyio/tiny'],
  ['GET', '/repos/:owner/:repo/collaborators', '/repos/tinyio/tiny/collaborators'],
  [
    'GET',
    '/repos/:owner/:repo/collaborators/:user',
    '/repos/tinyio/tiny/collaborators/fundon'
  ],
  [
    'PUT',
    '/repos/:owner/:repo/collaborators/:user',
    '/repos/tinyio/tiny/collaborators/fundon'
  ],
  [
    'DELETE',
    '/repos/:owner/:repo/collaborators/:user',
    '/repos/tinyio/tiny/collaborators/fundon'
  ],
  ['GET', '/repos/:owner/:repo/comments', '/repos/tinyio/tiny/comments'],
  [
    'GET',
    '/repos/:owner/:repo/commits/:sha/comments',
    '/repos/tinyio/tiny/commits/abcdefgh/comments'
  ],
  [
    'POST',
    '/repos/:owner/:repo/commits/:sha/comments',
    '/repos/tinyio/tiny/commits/abcdefgh/comments'
  ],
  ['GET', '/repos/:owner/:repo/comments/:id', '/repos/tinyio/tiny/comments/1024'],
  ['PATCH', '/repos/:owner/:repo/comments/:id', '/repos/tinyio/tiny/comments/1024'],
  ['DELETE', '/repos/:owner/:repo/comments/:id', '/repos/tinyio/tiny/comments/1024'],
  ['GET', '/repos/:owner/:repo/commits', '/repos/tinyio/tiny/commits'],
  ['GET', '/repos/:owner/:repo/commits/:sha', '/repos/tinyio/tinyj/commits/abcdefgh'],
  ['GET', '/repos/:owner/:repo/readme', '/repos/tinyio/tiny/readme'],
  ['GET', '/repos/:owner/:repo/contents/*path', '/repos/tinyio/tiny/contents/asdf'],
  ['PUT', '/repos/:owner/:repo/contents/*path', '/repos/tinyio/tiny/contents/asdf'],
  ['DELETE', '/repos/:owner/:repo/contents/*path', '/repos/tinyio/tiny/contents/asdf'],
  ['GET', '/repos/:owner/:repo/:archive_format', '/repos/tinyio/tiny/asdf'],
  ['GET', '/repos/:owner/:repo/keys', '/repos/tinyio/tiny/keys'],
  ['GET', '/repos/:owner/:repo/keys/:id', '/repos/tinys/tiny/keys/abcdefgh'],
  ['POST', '/repos/:owner/:repo/keys', '/repos/tinyio/tiny/keys'],
  ['PATCH', '/repos/:owner/:repo/keys/:id', '/repos/tinyio/tiny/keys/233'],
  ['DELETE', '/repos/:owner/:repo/keys/:id', '/repos/tinyio/tiny/keys/233'],
  ['GET', '/repos/:owner/:repo/downloads', '/repos/tinyio/tiny/downloads'],
  ['GET', '/repos/:owner/:repo/downloads/:id', '/repos/tinyio/tiny/downloads/233'],
  ['DELETE', '/repos/:owner/:repo/downloads/:id', '/repos/tinyio/tiny/downloads/987'],
  ['GET', '/repos/:owner/:repo/forks', '/repos/tinyio/tiny/forks'],
  ['POST', '/repos/:owner/:repo/forks', '/repos/tinyio/tiny/forks'],
  ['GET', '/repos/:owner/:repo/hooks', '/repos/tinyio/tiny/hooks'],
  ['GET', '/repos/:owner/:repo/hooks/:id', '/repos/tinyio/tiny/hooks/388'],
  ['POST', '/repos/:owner/:repo/hooks', '/repos/tinyio/tiny/hooks'],
  ['PATCH', '/repos/:owner/:repo/hooks/:id', '/repos/tinyio/tiny/hooks/231'],
  ['POST', '/repos/:owner/:repo/hooks/:id/tests', '/repos/tinyio/tiny/hooks/231/tests'],
  ['DELETE', '/repos/:owner/:repo/hooks/:id', '/repos/tinyio/tiny/hooks/231'],
  ['POST', '/repos/:owner/:repo/merges', '/repos/tinyio/tiny/merges'],
  ['GET', '/repos/:owner/:repo/releases', '/repos/tinyio/tiny/releases'],
  ['GET', '/repos/:owner/:repo/releases/:id', '/repos/tinyio/tiny/releases/233'],
  ['POST', '/repos/:owner/:repo/releases', '/repos/trejs/tiny/releases'],
  ['PATCH', '/repos/:owner/:repo/releases/:id', '/repos/tinyio/tiny/releases/231'],
  ['DELETE', '/repos/:owner/:repo/releases/:id', '/repos/tinyio/tiny/releases/231'],
  [
    'GET',
    '/repos/:owner/:repo/releases/:id/assets',
    '/repos/tinyio/tiny/releases/233/assets'
  ],
  [
    'GET',
    '/repos/:owner/:repo/stats/contributors',
    '/repos/tinyio/tiny/stats/contributors'
  ],
  [
    'GET',
    '/repos/:owner/:repo/stats/commit_activity',
    '/repos/trejs/tiny/stats/commit_activity'
  ],
  [
    'GET',
    '/repos/:owner/:repo/stats/code_frequency',
    '/repos/tinyio/tiny/stats/code_frequency'
  ],
  [
    'GET',
    '/repos/:owner/:repo/stats/participation',
    '/repos/tinyio/tiny/stats/participation'
  ],
  ['GET', '/repos/:owner/:repo/stats/punch_card', '/repos/tinyio/tiny/stats/punch_card'],
  ['GET', '/repos/:owner/:repo/statuses/:ref', '/repos/tinyio/tiny/statuses/dev'],
  ['POST', '/repos/:owner/:repo/statuses/:ref', '/repos/tinyio/tiny/statuses/master'],

  // Search
  ['GET', '/search/repositories', '/search/repositories'],
  ['GET', '/search/code', '/search/code'],
  ['GET', '/search/issues', '/search/issues'],
  ['GET', '/search/users', '/search/users'],
  [
    'GET',
    '/legacy/issues/search/:owner/:repository/:state/:keyword',
    '/legacy/issues/search/tinyio/tiny/open/iojs'
  ],
  ['GET', '/legacy/repos/search/:keyword', '/legacy/repos/search/tinyio'],
  ['GET', '/legacy/user/search/:keyword', '/legacy/user/search/go+iojs'],
  ['GET', '/legacy/user/email/:email', '/legacy/user/email/cfddream@gmail.com'],

  // Users
  ['GET', '/users/:user', '/users/fundon'],
  ['GET', '/user', '/user'],
  ['PATCH', '/user', '/user'],
  ['GET', '/users', '/users'],
  ['GET', '/user/emails', '/user/emails'],
  ['POST', '/user/emails', '/user/emails'],
  ['DELETE', '/user/emails', '/user/emails'],
  ['GET', '/users/:user/followers', '/users/fundon/followers'],
  ['GET', '/user/followers', '/user/followers'],
  ['GET', '/users/:user/following', '/users/fundon/following'],
  ['GET', '/user/following', '/user/following'],
  ['GET', '/user/following/:user', '/user/following/fundon'],
  ['GET', '/users/:user/following/:target_user', '/users/fundon/following/echo'],
  ['PUT', '/user/following/:user', '/user/following/fundon'],
  ['DELETE', '/user/following/:user', '/user/following/fundon'],
  ['GET', '/users/:user/keys', '/users/fundon/keys'],
  ['GET', '/user/keys', '/user/keys'],
  ['GET', '/user/keys/:id', '/user/keys/233'],
  ['POST', '/user/keys', '/user/keys'],
  ['PATCH', '/user/keys/:id', '/user/keys/233'],
  ['DELETE', '/user/keys/:id', '/user/keys/233']
];
