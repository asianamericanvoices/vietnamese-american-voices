// Texas Railroad Commission voter guide — data shared by every edition.
// Candidate order is Texas ballot order: French, Rosenthal, DiBianca.
// photo: set all three together, never one real photo next to placeholders.
// Current photos: candidate-submitted headshots via the Community Impact Q&A [5].

export const candidates = [
  { id: 'french', name: 'Bo French', partyKey: 'R', photo: '/rrc/bo-french.jpg', website: 'https://bofrench.com/', websiteLabel: 'bofrench.com' },
  { id: 'rosenthal', name: 'Jon Rosenthal', partyKey: 'D', photo: '/rrc/jon-rosenthal.jpg', website: 'https://jonrosenthaltx.com/', websiteLabel: 'jonrosenthaltx.com' },
  { id: 'dibianca', name: 'Arthur DiBianca', partyKey: 'L', photo: '/rrc/arthur-dibianca.jpg', website: 'https://www.votedibianca.com', websiteLabel: 'votedibianca.com' },
];

// Bump when guide copy changes; the footer shows the later of this and the newest story.
export const lastUpdated = '2026-10-18';

export const audioUrl = null; // explainer narration slot; player renders once set


export const links = { 'VoteTexas.gov': 'https://www.votetexas.gov/' };

// Source titles stay in English (they name English-language documents).
export const sources = [
  { id: '1', text: 'Railroad Commission of Texas, About Us', url: 'https://www.rrc.texas.gov/about-us/' },
  { id: '2', text: 'San Antonio Report, 2026 voter guide: Railroad Commission, Sept. 22, 2026', url: 'https://sanantonioreport.org/?p=5453870' },
  { id: '3', text: 'Texas Election Code §52.091, order of parties on the ballot', url: 'https://texas.public.law/statutes/tex._election_code_section_52.091' },
  { id: '4', text: 'Texas Election Code §52.092, order of offices on the ballot', url: 'https://statutes.capitol.texas.gov/Docs/EL/htm/EL.52.htm' },
  { id: '5', text: 'Community Impact, Q&A with the three Railroad Commission candidates, Aug. 25, 2026', url: 'https://communityimpact.com/central-austin/election/qa-get-to-know-3-candidates-for-texas-railroad-commissioner/' },
  { id: '6', text: 'Texas Tribune, Railroad Commission general election, June 16, 2026', url: 'https://www.texastribune.org/2026/06/16/texas-railroad-commission-general-election-bo-french-jon-rosenthal-social-issues-oil-gas/' },
  { id: '7a', text: 'Texas Tribune, Bo French doubles down on post after UT win, Sept. 14, 2026', url: 'https://www.texastribune.org/2026/09/14/bo-french-post-ut-ohio-football-game/' },
  { id: '7b', text: 'Texas Tribune, Karl Rove and Jon Rosenthal, Sept. 14, 2026', url: 'https://www.texastribune.org/2026/09/14/bo-french-kal-rove-endorsement-jon-rosenthal/' },
  { id: '7c', text: 'Texas Tribune, Bo French and the oil and gas industry, Sept. 17, 2026', url: 'https://www.texastribune.org/2026/09/17/bo-french-oil-gas-industry-texas/' },
  { id: '7d', text: 'Newsweek, Republicans backing Democrats, Sept. 16, 2026', url: 'https://www.newsweek.com/list-of-republicans-endorsing-voting-for-democrats-red-states-12450366' },
  { id: '8', text: 'Bo French campaign website', url: 'https://bofrench.com/' },
  { id: '9', text: 'Jon Rosenthal campaign website, priorities', url: 'https://jonrosenthaltx.com/priorities/' },
  { id: '10', text: 'Arthur DiBianca campaign website', url: 'https://www.votedibianca.com' },
  { id: '11', text: 'Branch, Arthur DiBianca candidate page', url: 'https://branch.vote/races/2026-texas-general-election-tx-state-railroad-commissioner-tx-state/candidates/arthur-dibianca' },
  { id: '12', text: 'VoteTexas.gov, required photo ID', url: 'https://www.votetexas.gov/voting/need-id.html' },
  { id: '12a', text: 'San Antonio Report, Jon Rosenthal candidate profile', url: 'https://sanantonioreport.org/profile/jon-rosenthal-2026-candidate-for-texas-railroad-commissioner' },
  { id: '13', text: 'FOX 4, Texas 2026 election dates (Texas Secretary of State)', url: 'https://www.fox4news.com/news/texas-early-voting-2026-primary-general-elections' },
  { id: '14', text: 'FOX 4, when polls open and close in Texas', url: 'https://www.fox4news.com/election/when-do-polls-open-close-election-day' },
  { id: '15', text: 'Lubbock Avalanche-Journal, Jon Rosenthal candidate questionnaire, Feb. 15, 2026', url: 'https://www.lubbockonline.com/story/news/politics/elections/candidate-profiles/2026/02/15/jon-rosenthals-2026-texas-democratic-primary-candidate-questionnaire-for-texas-railroad-commissioner/88594202007/' },
  { id: '16', text: 'Jon Rosenthal campaign website, Texas Energy Leadership & Good Jobs', url: 'https://jonrosenthaltx.com/priority/texas-energy-leadership-good-jobs/' },
  { id: '17', text: 'Houston Chronicle, Republican leaders back Bo French after the runoff, May 29, 2026', url: 'https://www.houstonchronicle.com/politics/article/greg-abbott-backs-bo-french-warning-wreck-22281048.php' },
  { id: '18', text: 'Texas Tribune, Railroad Commission race overview, Sept. 15, 2026', url: 'https://www.texastribune.org/2026/09/15/texas-railroad-commission-election-2026-bo-french-jon-rosenthal/' },
  { id: '19', text: "The Texan, Republican officials respond to Bo French's comment on UT Austin students, Sept. 15, 2026", url: 'https://thetexan.news/elections/2026/republican-officials-respond-to-bo-frenchs-comment-on-ut-austin-students/article_85e1e0d1-e86f-4ccc-9c27-336d952975bf.html' },
  { id: '20', text: 'Houston Chronicle editorial board endorsement, Sept. 21, 2026', url: 'https://www.houstonchronicle.com/opinion/endorsements/article/jon-rosenthal-texas-railroad-commissioner-french-22438917.php' },
  { id: '21', text: 'Dallas Morning News editorial board recommendation, Oct. 13, 2026', url: 'https://www.dallasnews.com/opinion/we-recommend/article/texas-railroad-commissioner-recommendation-22469104.php' },
  { id: '22', text: 'Austin American-Statesman editorial board endorsement, Oct. 6, 2026', url: 'https://www.statesman.com/opinion/editorials/article/rosenthal-railroad-commission-endorsement-22421037.php' },
  { id: '23', text: 'Texas AFL-CIO, 2026 general election endorsements', url: 'https://texasaflcio.org/news/2026-general-election-endorsements' },
  { id: '24', text: 'Libertarian Party of Texas, candidates', url: 'https://www.lptexas.org/candidates' },
  { id: '25', text: "NBC News, Texas Republicans call Railroad Commission candidate's social media post racist, Sept. 13, 2026", url: 'https://www.nbcnews.com/politics/elections/texas-republicans-call-railroad-commissioner-candidate-racist-social-m-rcna597581' },
  { id: '26', text: 'Dallas Morning News, Rep. Angie Chen Button says she will not vote for Bo French, Sept. 30, 2026', url: 'https://www.dallasnews.com/news/politics/article/gop-rep-angie-chen-button-not-vote-republican-bo-22456368.php' },
  { id: '27', text: 'Texas Oil and Gas Association PAC, 2026 general election slate of candidates', url: 'https://docs.txoga.org/files/5202-txoga-pac-slate-of-candidates-2026-general_10-13-26.pdf' },
  { id: '28', text: 'WFAA, Republican Fort Worth Mayor Mattie Parker endorses Jon Rosenthal, Oct. 25, 2026', url: 'https://www.yahoo.com/news/politics/articles/republican-fort-worth-mayor-mattie-002127447.html' },
  { id: '29', text: 'Dallas Morning News, Former GOP Railroad Commission candidate Hawk Dunlap supports Jon Rosenthal, June 30, 2026', url: 'https://www.dallasnews.com/news/politics/article/ex-gop-candidate-railroad-commission-supports-22325471.php' },
  { id: '30', text: 'San Antonio Express-News editorial board endorsement, Sept. 25, 2026', url: 'https://www.expressnews.com/opinion/editorial/article/rosenthal-railroad-commission-22444771.php' },
  { id: '31', text: "Texas Tribune, UT students respond to Bo French's post, Sept. 15, 2026", url: 'https://www.kbtx.com/2026/09/15/ut-students-attacked-by-bo-french-call-his-comments-disgusting-too-familiar/' },
  { id: '32', text: "Texas Public Radio, What Bo French's posts mean for him and for Republicans, Oct. 8, 2026", url: 'https://www.tpr.org/government-politics/2026-10-08/hes-trying-to-divide-what-bo-frenchs-racist-posts-mean-for-him-republicans-and-american-politics' },
  { id: '33', text: "Texas Tribune, Top Texas Republicans knew of Bo French's past comments, Sept. 18, 2026", url: 'https://www.texastribune.org/2026/09/18/bo-french-texas-republicans-silence/' },
  { id: '34', text: "Dallas Morning News, Bo French's social media posts, Sept. 18, 2026", url: 'https://www.dallasnews.com/news/politics/article/republican-bo-french-s-social-media-posts-full-22434821.php' },
  { id: '35', text: "Texas Tribune, Bo French remarks at Texas CPAC, March 27, 2026", url: 'https://www.texastribune.org/2026/03/27/texas-cpac-bo-french-islamophobia-muslim-railroad-commissioner-deport/' },
  { id: '36', text: "Spectrum News, Railroad Commission candidate calls for deportations, March 31, 2026", url: 'https://spectrumlocalnews.com/tx/austin/news/2026/03/31/railroad-commission-candidate-calls-for-deportation-of-100m' },
  { id: '37', text: "KERA News / Fort Worth Report, Bo French posts about Rep. Salman Bhojani, Aug. 13, 2025", url: 'https://fortworthreport.org/2025/08/13/tarrant-county-gop-leader-posts-anti-muslim-remarks-about-texas-house-member-2/' },
  { id: '38', text: "FOX 4, Bo French poll and Dan Patrick's response, June 27, 2025", url: 'https://www.fox4news.com/news/tarrant-county-bo-french-poll-dan-patrick' },
];
