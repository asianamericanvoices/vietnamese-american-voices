// Texas Railroad Commission voter guide — ENGLISH MASTER copy (review edition: ?lang=en).
// Source: RRC_Page_Handoff_for_Claude_Code.md (Oct 15, 2026), section 5, verbatim.
// Do not rewrite candidate positions; they must stay parallel across all three.
// Shared data (names, websites, photos, sources) lives in ./shared.js.
// Inline [n] markers become footnote links to the matching source id.

const en = {
  edition: {
    lang: 'en',
    locale: 'en-US',
    ogLocale: 'en_US',
    titleLanguage: null, // English edition shows outlets' original headlines
  },

  meta: {
    title: "Texas Railroad Commission: what's on your ballot",
    description: 'A nonpartisan voter guide to the November 3, 2026 Texas Railroad Commission race: what the Commission does, how to vote, and the three candidates side by side.',
  },

  // Site chrome around the guide (matches the other event hubs)
  site: {
    contact: 'Contact',
    hubBarLabel: '🗳️ Key Elections:',
    texasHub: '🗳️ Texas Elections 2026',
    thisPage: 'Texas Railroad Commission 2026',
    specialReport: 'Special Report',
    categories: {
      all: 'All News', General: 'General', 'US Politics': 'US Politics', Healthcare: 'Healthcare',
      Education: 'Education', Immigration: 'Immigration', Economy: 'Economy', Culture: 'Culture', Sports: 'Sports',
    },
    votingButton: '🗳️ Texas voter information',
    votingSubline: 'Voting information for Texas residents • Registration • Polling locations • General Election Nov 3',
    newsletterHeading: 'Subscribe to the Newsletter',
    newsletterBody: 'Get news that affects the Filipino American community in your inbox.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    newsletterLoading: 'Subscribing...',
    newsletterInvalid: 'Please enter a valid email address',
    newsletterError: 'Subscription failed. Please try again later',
    loadMore: 'Show more stories',
    footerTagline: 'Bringing important stories to the Filipino American community.',
    footerAbout: 'About Us',
    footerMission: 'Our mission',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Use',
    footerRights: '© 2026 Tinig ng Filipino Amerikano. All rights reserved.',
  },

  ui: {
    carouselLabel: 'Texas Railroad Commission race at a glance',
    slideOf: (n, total) => `Slide ${n} of ${total}`,
    prevSlide: 'Previous slide',
    nextSlide: 'Next slide',
    goToSlide: (n) => `Go to slide ${n}`,
    listen: 'Listen to this explainer',
    original: 'Original',
    originalHeadline: 'Original headline',
    candidateColumn: 'Candidate',
    sourcesHeading: 'Sources',
    lastUpdatedLabel: 'Last updated',
    loading: 'Loading…',
    noStories: 'No stories yet.',
  },

  header: {
    title: "Texas Railroad Commission: what's on your ballot",
    dateLine: 'Election Day: Tuesday, November 3 · Early voting: October 19–30',
  },

  // HTML slides; text from the slide alt text (5.2). `candidates` arrays follow ballot order.
  slides: [
    {
      title: "Who's running for Texas Railroad Commissioner",
      question: 'Listed in the order they appear on the Texas ballot, as set by state law, not by {outlet}.',
      // Candidate descriptions adapted from the Community Impact Q&A [5]; Rosenthal's district from [12a]
      candidates: [
        'Bo is an entrepreneur and 3rd-generation oilman with three decades of experience in the industry.',
        'Jon Rosenthal is an engineer and state representative for Northwest Houston.',
        'Former computer programmer, now retired.',
      ],
      note: 'Candidate descriptions adapted from the Community Impact Q&A, Aug. 25, 2026 [5][12a]',
    },
    // Slides 2-5: each candidate's full answer to the same Community Impact question [5],
    // quoted verbatim (answers capped at 50 words by Community Impact). Ballot order.
    {
      eyebrow: 'Key positions · In their own words',
      title: 'Top priorities',
      question: 'What would your top priorities be if elected?',
      quotes: true,
      candidates: [
        'My top priorities would be to fix administrative inefficiencies and overly-broad regulation to allow operators to produce energy at a more affordable cost to consumers, while protecting landowners and plugging more abandoned wells.',
        "The Railroad Commission should put the people of Texas above big money interests, but lacks resources to do so adequately. I'll advocate for increased funding to enforce existing requirements and be more responsive to communities. We should streamline permits for good actors and impose serious fines on egregious violators.",
        'I want to fully respect the property rights of landowners, and make sure that property rights always have priority over industry interests. Better transparency. Simplify and clean up 100 years of regulations.',
      ],
      note: "Candidates' answers to the same Community Impact questionnaire, Aug. 25, 2026 [5]",
    },
    {
      eyebrow: 'Key positions · In their own words',
      title: 'Regulating oil and gas',
      question: 'What does the railroad commission need to do to most effectively regulate Texas oil, gas and related industries?',
      quotes: true,
      candidates: [
        'Texas is a large, diverse state. By tailoring regulations and Commission operations to the specific environment and needs across our state, rather than using blanket rules that apply the same to operators of various sizes in different environments, we can make production more efficient while producing responsibly.',
        'We should streamline processes and reduce permitting time and costs for good actors, to encourage and promote responsible operators. And we should impose heavy fines and rigid requirements on egregious violators. Breaking the law should have consequences, and we must not reward companies who operate outside legal limits.',
        "We need much better transparency, and avoid ‘regulatory capture’. The RRC's job is not to promote the oil and gas industry, but to make choices that secure the property rights of all Texans. We need better balance between surface rights and mineral rights.",
      ],
      note: "Candidates' answers to the same Community Impact questionnaire, Aug. 25, 2026 [5]",
    },
    {
      eyebrow: 'Key positions · In their own words',
      title: 'Environment and safety',
      question: "What steps will you take to handle environmental risks and overall safety related to the state's oil and gas/pipeline infrastructure?",
      quotes: true,
      candidates: [
        'As a rancher, I have dealt with environmental issues on my own property. I understand the landowner perspective and will work with the industry and with landowners to find solutions that safeguard our land and environment while allowing energy to be produced efficiently.',
        "I'll advocate for funding to turbocharge well plugging and environmental cleanup. And I'll work with communities and industry stakeholders to end routine flaring, weatherize natural gas facilities, implement stronger setback standards, and more common-sense measures to reduce environmental risks while also ensuring this critical industry continues to thrive.",
        'Restitution should be readily available in cases of property damage from earthquakes, wastewater leaks, etc. Insurance, bonding, and industry-supported cleanup funds are all ways to support that.',
      ],
      note: "Candidates' answers to the same Community Impact questionnaire, Aug. 25, 2026 [5]",
    },
    {
      eyebrow: 'Key positions · In their own words',
      title: 'Renewable energy',
      question: 'What are your views on the future of renewable energy in Texas?',
      quotes: true,
      candidates: [
        "If renewables can help meet our energy needs, that's great. I believe these projects should be economic on their own without taxpayer-funded incentives. These projects may become more successful in the future as technology develops.",
        'I support an all-of-the-above approach to energy production in Texas. Frankly – we need all the power we can get. Even before considering data centers, explosive growth of all other industries and population growth demands this approach. We should promote all energy production, including natural gas, geothermal, and renewable sources.',
        'Renewable energy can be great, but it has to compete in a free market with fossil fuels. Our government and regulators should not favor one form over another.',
      ],
      note: "Candidates' answers to the same Community Impact questionnaire, Aug. 25, 2026 [5]",
    },
    {
      title: 'How to vote',
      bullets: [
        'Early voting October 19–30',
        'Election Day Tuesday, November 3, 7 a.m. to 7 p.m.',
        'Bring a photo ID',
        'Find your polling place and sample ballot on your county elections website or VoteTexas.gov',
      ],
    },
  ],

  latest: {
    heading: 'Top stories',
    count: 4,
    note: 'This box is updated as news about any candidate in this race breaks.',
  },

  explainer: {
    heading: 'What the Railroad Commission does',
    paragraphs: [
      "Despite its name, the Texas Railroad Commission's job today is energy. It is the state agency that regulates Texas's oil and natural gas industry, pipelines and natural gas utilities [1], and its work includes sealing abandoned oil and gas wells [6]. Its rules affect the gas companies that serve homes, the gas facilities Texas relies on in extreme weather [6], and families who live near drilling sites and pipelines.",
      'The Commission has three members [1], elected statewide to staggered six-year terms. One seat is on the ballot this year [2].',
      'On your ballot, the race appears with the other statewide offices, after governor, lieutenant governor, attorney general, comptroller, land commissioner and agriculture commissioner [4].',
    ],
  },

  howToVote: {
    heading: 'How to vote in Texas',
    items: [
      { lead: 'Early voting:', text: 'Monday, October 19 through Friday, October 30, at any early voting location in your county [13].' },
      { lead: 'Election Day:', text: 'Tuesday, November 3 [13]. Polls are open 7 a.m. to 7 p.m. local time [14].' },
      { lead: 'Bring a photo ID,', text: 'such as a Texas driver license, Texas personal identification card or U.S. passport [12].' },
      { lead: 'Find your polling place and sample ballot', text: 'on your county elections office website or at VoteTexas.gov [12].' },
    ],
  },

  candidatesSection: {
    heading: 'The candidates side by side',
    intro: "About this section: All three candidates are profiled in the same format, drawing on news reports, campaign websites and a Community Impact questionnaire they all answered [5], and are listed in Texas ballot order [3]. An “In the news” note appears when a candidate's campaign statements or conduct were reported by at least two established news organizations and drew criticism beyond the candidate's political opponents; it includes the candidate's response. {outlet} does not endorse candidates.",
    rows: [
      { key: 'work', label: 'Work background' },
      { key: 'office', label: 'Public or party office' },
      { key: 'endorsements', label: 'Notable endorsements' },
      { group: 'Their position on…' },
      { key: 'bills', label: 'Your energy bills' },
      { key: 'wells', label: 'Old oil and gas wells' },
      { key: 'drilling', label: 'Living near drilling' },
      { key: 'renewables', label: 'Renewable energy' },
      { key: 'website', label: 'Campaign website' },
    ],
    backgroundLabel: 'Background.',
    inWordsLabel: 'In his words.',
    endorsementsLabel: 'Notable endorsements.',
    inTheNewsLabel: 'In the news.',
  },

  // Keyed by shared candidate id. Identical fields for all three.
  candidateText: {
    french: {
      party: 'Republican',
      table: {
        work: 'Energy trader beginning in 1994; rancher and mineral owner; has owned security businesses in the Middle East [8]. Family runs an oil business in Midland [6]',
        office: 'Former chair of the Tarrant County Republican Party [6]',
        endorsements: 'Gov. Greg Abbott; Lt. Gov. Dan Patrick; Railroad Commissioners Christi Craddick and Wayne Christian [17][8]; Texas Alliance of Energy Producers [18]; Texas Oil and Gas Association PAC, which condemned French\'s Sept. 13 post but had not withdrawn its endorsement as of Sept. 15 [7c][19]',
        bills: 'Cut administrative inefficiency and overly broad regulation to lower energy costs [5]',
        wells: 'Plug more abandoned wells [5]',
        drilling: 'Work with industry and landowners to protect land and the environment [5]',
        renewables: 'Supports renewables if economically viable without taxpayer incentives [5]',
      },
      background: 'French was raised in Midland [8], where his family runs an oil business [6]. He entered the energy industry in 1994 and worked as an energy trader for a decade, and says he has owned and operated security businesses in the Middle East [8]. He is a former chair of the Tarrant County Republican Party [6]. He won the Republican nomination by defeating incumbent Commissioner Jim Wright in the May runoff [6].',
      // Same rule for all three: statewide coverage + widely criticized = one factual passage.
      inTheNews: 'On Sept. 13, French posted a photo of University of Texas students in the stands at a football game, later writing that the university prioritizes "foreigners over Texans"; Republican leaders including Sen. John Cornyn and Texas House Speaker Dustin Burrows criticized the post as racist [7a][25]. Two students in the photo later told The Dallas Morning News they are U.S. citizens [26]. French defended the post, saying, "the bigger conversation is, are we going to have policies to prioritize Americans – or are we going to have policies that prioritize foreigners?" [7a]',
      inWords: 'French says his priorities are to reduce administrative inefficiency and overly broad regulation to lower energy costs, protect landowners, and plug more abandoned wells [5]. His campaign says he has committed to "ending DEI, overbearing regulation, and the influence of radical Islam and the CCP in Texas oil" [8], and to enforcing the Texas Legislature\'s ban on hostile foreign land ownership [8]. He says the Commission awards more than $1 million a year in contracts based on diversity, equity and inclusion criteria, and wants to end the practice [6]. He calls water use the greatest challenge facing Texas over the next five years [5].',
    },
    rosenthal: {
      party: 'Democrat',
      table: {
        work: 'Engineer with about 25 years in and around the oil and gas industry [12a]',
        office: 'State representative for Northwest Houston in the Texas House [12a]',
        endorsements: 'Editorial boards of the Houston Chronicle, Dallas Morning News and Austin American-Statesman [20][21][22]; Texas AFL-CIO [23]; Sierra Club [18]',
        bills: 'Keep gas rates fair and bills down [9]; weatherize gas facilities for extreme weather [6]',
        wells: 'New fee on saltwater (oilfield wastewater) disposal; higher operator bonds and cash deposits [6]',
        drilling: 'Stronger setbacks; more responsive to communities [5]',
        renewables: 'Supports "All of the Above" energy strategies, encouraging solar, wind, geothermal and hydrogen [15][16]',
      },
      background: 'Rosenthal is an engineer who spent about 25 years working in and around the oil and gas industry, and represents Northwest Houston in the Texas House [12a]. He ran unopposed in the Democratic primary [6].',
      inTheNews: "No matter meeting this guide's standard has been reported as of Oct. 18.",
      inWords: 'Rosenthal\'s campaign lists priorities including "Putting Texans Over Special Interests" and "Keep the Heat and Lights ON & Bring Bills Down" [9]. He says he would seek more enforcement funding for the Commission, faster permits for responsible operators and heavy fines for serious violators [5]. He proposes a new fee on saltwater disposal and higher operator bonds and cash deposits to pay for plugging wells [6], weatherization of natural gas facilities for extreme weather [6], an end to routine flaring, and stronger setbacks [5].',
    },
    dibianca: {
      party: 'Libertarian',
      table: {
        work: 'Retired programmer; formerly worked for the Texas Department of Transportation [11]',
        office: 'None; longtime Libertarian activist [10]',
        endorsements: 'None reported as of Oct. 18. Nominee of the Libertarian Party of Texas [24]',
        bills: 'Competitive access to pipelines and markets instead of monopoly protections [10]',
        wells: 'Operators accountable for plugging and cleanup; bonding and insurance instead of taxpayer bailouts [10]',
        drilling: "Put landowners' property rights ahead of industry interests [5]",
        renewables: 'All sources should compete without subsidies or mandates [11]',
      },
      background: 'DiBianca is originally from San Antonio, is a retired programmer and previously worked for the Texas Department of Transportation [11]. He lives in Austin and has been a Libertarian activist for many years [10].',
      inTheNews: "No matter meeting this guide's standard has been reported as of Oct. 18.",
      inWords: 'DiBianca says the Commission should not promote the industry it regulates but secure property rights for all Texans, giving landowners priority over industry interests, and that he would simplify the Commission\'s rules and improve transparency [5]. His campaign says it would "hold operators accountable for well plugging and cleanup" and "encourage bonding and insurance markets to handle environmental risks instead of taxpayer bailouts" [10]. He supports "an all-of-the-above energy mix without government subsidies or mandates" [11].',
    },
  },

  coverage: {
    heading: 'Coverage of the race',
    intro: 'Reporting on this race from established Texas newsrooms, translated by {outlet} and credited to the original outlet.',
  },

  footer: {
    disclaimer: '{outlet} does not endorse candidates.',
    photoCredit: 'Photos courtesy of the candidate campaigns, as provided to Community Impact.', // shown only once candidate photos are in place
    corrections: 'Corrections: if you see an error, email',
    correctionsEmail: 'contact@tinigngfilipinoamerikano.us', // site's public contact address; never a personal email
  },
};

export default en;
