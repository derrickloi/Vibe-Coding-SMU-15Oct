export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string[];
  byline: string;
  readTime: string;
  publishedAt?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  section: string;
  tag?: string;
  badge?: string;
  commentsCount?: number;
  authorAvatar?: string;
  authorRole?: string;
  audioDuration?: string;
  isBreaking?: boolean;
  comments?: Array<{
    id: string;
    author: string;
    location: string;
    time: string;
    text: string;
    likes: number;
  }>;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'trump-press-secretary',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    excerpt: 'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.',
    section: 'U.S. Politics',
    tag: 'White House Bureau',
    byline: 'Katie Rogers and Jonathan Swan',
    readTime: '4 min read',
    audioDuration: '4:15',
    publishedAt: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA87yIoWFSfTFNmeogUxelNEu_1AtPpv5aSDjdMsfktGQ3gNguMF6GG6HvRI0FNHo5cCnAe-0IMA5nCZpVEEwaBI_bnhC4XzoAjtPkQHnlIDyz0HJXG-7dJ4Y-qRqhUlMvrwNAP-G94SF9EDDr_Hr4OP5S1IIUN0auQo4HZQdX09dUIuTY6EKsVjfYImWtNrfWMkayo1FvroHT-Yv9gyBqT31F1llDWLERDNuVYmZUYgwNyv7vttGiv',
    imageCaption: 'The newly appointed press secretary took the podium on Wednesday to address inquiries regarding her background.',
    imageCredit: 'Kenny Holston/The New York Times',
    commentsCount: 428,
    body: [
      'WASHINGTON — When President Trump named Katie Zacharia as his principal White House press secretary, he hailed her in a statement on social media as a “fierce advocate, television veteran and an elite attorney at law.”',
      'There was only one complication: Ms. Zacharia has never been licensed to practice law in the District of Columbia or any of the fifty states, according to public bar records and officials contacted across four jurisdictions.',
      'In an exclusive interview with The New York Times on Tuesday evening, Ms. Zacharia sought to tamp down the brewing controversy, attributing the characterization to “an enthusiastic miscommunication during resume preparation and briefing memos.”',
      '“I completed my coursework in legal studies and sat for the examinations in good faith,” Ms. Zacharia explained, speaking from an office steps from the West Wing briefing room. “At no point did I personally mislead the president or seek to represent individuals in an open courtroom without formal standing.”',
      'The episode marks the latest in a sequence of vetting complications confronting the administration in its second term, as traditional vetting apparatuses have repeatedly been bypassed in favor of personal loyalty and telegenic screen presence.',
      'Legal ethics watchdogs, however, have questioned whether official statements issued under legal descriptors violate federal misrepresentation statutes. “In official government communications, words matter, and formal titles carry specific statutory obligations,” noted Deborah Rhodes, a professor of legal ethics at Georgetown Law Center.',
      'White House chief of staff aides insisted that Ms. Zacharia enjoys the president’s complete confidence and will continue to brief reporters on a daily schedule beginning Thursday morning.'
    ],
    comments: [
      {
        id: 'c1',
        author: 'Eleanor Vance',
        location: 'Philadelphia, PA',
        time: '2 hours ago',
        text: 'The complete collapse of standard institutional vetting continues to amaze. Whatever happened to basic background checks before naming a principal spokesperson?',
        likes: 142
      },
      {
        id: 'c2',
        author: 'Marcus K.',
        location: 'Denver, CO',
        time: '1 hour ago',
        text: 'She clarified the issue quickly and directly. What matters is whether she delivers the White House agenda accurately at the lectern.',
        likes: 38
      }
    ]
  },
  {
    id: 'women-leaving-trump-admin',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    excerpt: 'In the president’s second term, those heading for the exits are female officials.',
    section: 'U.S. Politics',
    byline: 'Tierney L. Cross',
    readTime: '5 min read',
    audioDuration: '5:20',
    publishedAt: 'October 14, 2026',
    commentsCount: 312,
    body: [
      'WASHINGTON — Over the past four months, a quiet but steady exodus of high-ranking women has reshaped the upper echelons of the federal government.',
      'From deputy secretaries to senior policy directors at the National Security Council and Department of Commerce, at least eleven senior female officials have tendered their resignations or been reassigned to external advisory roles.',
      'Interviews with current and departed officials describe an increasingly insular inner circle where aggressive factional politics and loyalty litmus tests have marginalized experienced civil servants.',
      '“The working atmosphere became untenable for anyone advocating institutional norms,” said one former assistant secretary who requested anonymity to speak candidly about internal White House deliberations.',
      'Administration spokespersons disputed any gender-based patterns, stating that turnover in high-stress cabinet positions is standard midway through presidential cycles.'
    ]
  },
  {
    id: 'guilfoyle-rise-and-fall',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    excerpt: 'The former campaign aide and envoy nominee’s rapid retreat highlights widening fractures among loyalists.',
    section: 'U.S. Politics',
    byline: 'Maggie Haberman and Jonathan Swan',
    readTime: '4 min read',
    audioDuration: '4:45',
    publishedAt: 'October 14, 2026',
    commentsCount: 519,
    body: [
      'PALM BEACH, Fla. — Just weeks after being nominated for a high-profile diplomatic post in Europe, Kimberly Guilfoyle finds herself abruptly on the outside of Mar-a-Lago’s inner sanctum.',
      'The retreat came following a series of contentious closed-door confrontations over committee assignments and fundraising channels. What began as a dispute over campaign expenditures ballooned into a test of loyalty among the president’s longest-serving associates.',
      'Advisers close to the family noted that while alliances in the Trump political orbit are notoriously fluid, the suddenness of Ms. Guilfoyle’s departure caught even seasoned operatives off guard.',
      '“One day you are seated at the head table; the next day your calls are routed to external liaisons,” remarked a longtime Republican consultant.'
    ]
  },
  {
    id: 'cornell-president-faculty',
    title: 'Cornell’s President Is Grilled by Faculty Senate Over Handling of Allegations',
    excerpt: 'In an unprecedented closed-door session, faculty members pushed leadership on accountability and administrative transparency.',
    section: 'Education',
    tag: 'Investigation',
    byline: 'Anemona Hartocollis',
    readTime: '4 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 84,
    body: [
      'ITHACA, N.Y. — Tensions boiled over on Wednesday as Cornell University’s Faculty Senate summoned the university president to respond to intense scrutiny regarding administrative handling of recent ethics allegations.',
      'Over the course of three fraught hours, faculty members pressed for immediate disclosure of independent review findings and questioned whether leadership had prioritized public relations over academic integrity.',
      'The president pledged to establish a faculty oversight committee by month’s end, though several department chairs expressed skepticism about whether systemic changes would follow.'
    ]
  },
  {
    id: 'shelly-coach-coming-out',
    title: 'Coming Out at 50 Can Be Hard. Shelly Found a Coach.',
    excerpt: 'She spent decades building an identity as a wife and mother. Could she disrupt “a perfectly good family dynamic” to live her own truth?',
    section: 'Lifestyle',
    tag: 'The Great Read',
    byline: 'Sophie Park for The New York Times',
    readTime: '8 min read',
    audioDuration: '8:10',
    publishedAt: 'October 14, 2026',
    commentsCount: 167,
    body: [
      'MINNEAPOLIS — For thirty years, Shelly’s life unfolded along a conventional Midwestern trajectory: suburban house, two children, parent-teacher conferences, and community volunteer work.',
      'Yet beneath the routine lay a persistent feeling of living someone else’s script. At age fifty, Shelly made the terrifying decision to hire a specialized transition life coach.',
      '“I didn’t hate my marriage,” Shelly reflected, watching autumn leaves drift across her newly leased apartment balcony. “I just realized that if I didn’t live honestly now, I might run out of decades.”',
      'Her story is part of a growing demographic phenomenon: midlife women seeking professional guidance to navigate late-blooming sexual orientation and personal reinventive chapters.'
    ]
  },
  {
    id: 'ukraine-satellite-russia-escalates',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    excerpt: 'A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite program was curbed.',
    section: 'World',
    tag: 'Russia-Ukraine War',
    badge: 'Update',
    byline: 'Andrew E. Kramer and Eric Schmitt',
    readTime: '6 min read',
    audioDuration: '6:30',
    publishedAt: 'October 14, 2026',
    commentsCount: 1100,
    body: [
      'KYIV, Ukraine — Waves of synchronized ballistic missiles and Shahed drones pounded Ukraine’s central electrical grid overnight, plunging more than 600,000 households in the capital into cold darkness.',
      'Compounding the emergency, military commanders confirmed that orbital recon feeds provided via a Pentagon-contracted commercial constellation had experienced severe operational bandwidth cuts.',
      'The restrictions come at a precarious juncture as Russian forces press advantages along the Pokrovsk axis, utilizing glide bombs to shatter fortified defensive lines.',
      'President Volodymyr Zelensky issued a late-night address appealing to European partners for urgent air defense replenishment and autonomous reconnaissance assets.'
    ]
  },
  {
    id: 'trump-diesel-deal-putin',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    excerpt: 'Global refining bottlenecks and shipping tariffs mean crude supply shifts provide little solace to consumers at the pump.',
    section: 'Business',
    byline: 'Stanley Reed and Clifford Krauss',
    readTime: '4 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 92,
    body: [
      'HOUSTON — While the White House promoted a tentative maritime energy pact with Moscow as an imminent cure for runaway diesel prices, energy economists and refinery executives warn that consumers should not expect relief.',
      'The global bottleneck is not primarily one of raw crude extraction, but rather refinery capacity and stringent maritime insurance regulations.',
      '“You cannot simply ship Russian heavy sour blends into modern cracking facilities designed for light sweet crude without extensive retrofit periods,” noted one senior energy analyst.'
    ]
  },
  {
    id: 'us-intelligence-ukraine',
    title: 'The U.S. Continues to Provide Intelligence to Ukraine, Officials Say',
    excerpt: 'Despite diplomatic friction in Washington, real-time battlefield data transmission remains active across the eastern front.',
    section: 'World',
    byline: 'Julian E. Barnes',
    readTime: '3 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 75,
    body: [
      'WASHINGTON — In spite of partisan debates in Congress over funding authorizations, senior defense officials affirmed on Wednesday that intelligence feeds, early radar warnings, and tactical telemetry continue to flow to Ukrainian commanders without disruption.',
      'The collaboration remains coordinated through allied military centers in Germany and Poland, ensuring frontline units maintain situational awareness against incoming aerial threats.'
    ]
  },
  {
    id: 'lung-cancer-pope-leo',
    title: 'A New World of Lung Cancer Therapy Awaits Pope Leo',
    excerpt: 'Lung cancer rates dropped by half since the 1990s as personalized genetic targeted therapies advance rapidly.',
    section: 'Health',
    tag: 'Health & The Vatican',
    byline: 'Gina Kolata',
    readTime: '5 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 126,
    body: [
      'ROME — When the Vatican announced that Pope Leo had been diagnosed with an early-stage pulmonary lesion, medical observers immediately pointed to how radically the oncology landscape has transformed in recent years.',
      'Where chemotherapy was once the blunt, solitary option, genetic tumor sequencing now matches oncologists with targeted kinase inhibitors and antibody-drug conjugates tailored to specific cellular mutations.',
      'Vatican physicians confirmed that the Pontiff is undergoing non-invasive targeted therapy and is expected to continue normal diplomatic duties.'
    ]
  },
  {
    id: 'opinion-democrats-two-years',
    title: 'Democrats Shouldn’t Wait Two More Years',
    excerpt: 'Midterm strategies cannot afford passive resistance when structural changes are happening in plain daylight.',
    section: 'Opinion',
    byline: 'David Wallace-Wells',
    authorRole: 'Opinion Columnist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&h=140&q=80',
    readTime: '4 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 388,
    body: [
      'It has become an article of faith among Democratic strategists that patience is their greatest asset: that voters will eventually tire of executive overreach, that economic realities will catch up with grand promises, and that 2028 will offer an organic rebound.',
      'This is a grave miscalculation. When executive authorities remap administrative law and regulatory agencies on a weekly basis, waiting for electoral calendars is a recipe for irrelevance.',
      'Real opposition requires proactive state-level governance, defensive legal coalitions, and an affirmative economic vision that addresses working-class anxieties before the next election cycle begins.'
    ]
  },
  {
    id: 'opinion-ebola-spread',
    title: 'I’ve Never Seen Ebola Spread Like This',
    excerpt: 'Field doctors in central corridors confront mutated vectors and strained isolation facilities.',
    section: 'Opinion',
    tag: 'Guest Essay',
    byline: 'Heather Kerr',
    authorRole: 'Guest Essayist',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&h=140&q=80',
    readTime: '6 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 204,
    body: [
      'GOMA, Democratic Republic of Congo — Over twenty years in epidemic triage zones across three continents, I believed I had witnessed the full spectrum of viral volatility.',
      'The current outbreak, however, presents clinical anomalies that defy classical textbook behaviors. Incubation windows have lengthened, and asymptomatic transmission clusters are appearing in urban transit hubs.',
      'Without an immediate surge in global vaccine stockpiles and community health personnel, containment within the region will become statistically impossible.'
    ]
  },
  {
    id: 'opinion-manifesto-manifestoes',
    title: 'A Manifesto to End All Manifestoes',
    excerpt: 'Modern political tracts have become predictable performance rituals detached from actual governance.',
    section: 'Opinion',
    byline: 'Carlos Lozada',
    authorRole: 'Opinion Columnist',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&h=140&q=80',
    readTime: '5 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 69,
    body: [
      'Every political season produces its requisite library of manifestos: glossy paperbacks promising revolution, restoration, or ruin, drafted by think-tank fellows seeking cabinet auditions.',
      'Yet reading them side by side reveals a striking uniformity. What masquerades as bold intellectual courage is almost invariably focus-grouped ideology engineered to provoke social media outrage.',
      'Perhaps what our civic discourse requires most is fewer manifestos and far more quiet, rigorous, institutional craftsmanship.'
    ]
  },
  {
    id: 'opinion-tom-cruise-flop',
    title: 'Tom Cruise’s Big Flop Is a Secret Masterpiece',
    excerpt: 'Looking back at the ambitious misfire that showed an actor daring to dismantle his own myth.',
    section: 'Opinion',
    byline: 'Jayson Greene',
    authorRole: 'Contributing Critic',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&h=140&q=80',
    readTime: '5 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 152,
    body: [
      'In Hollywood history, few stars have guarded their screen personas with the meticulous tenacity of Tom Cruise. From fighter jets to scaling Burj Khalifa, the image of triumphant invulnerability is his signature commodity.',
      'Which is why his most notorious box-office stumble remains his most daring cinematic achievement: an unsettling, vulnerable exploration of mortality and regret that audiences in that era were completely unready to receive.',
      'Seen with twenty years of distance, the film stands as a poignant reminder of what happens when a legendary icon genuinely risks everything on screen.'
    ]
  },
  {
    id: 'wirecutter-stick-vacuums',
    title: 'The 6 Best Cordless Stick Vacuums of 2026',
    excerpt: 'We tested 24 leading cordless models on hardwood, thick pile, and pet hair. Here are our definitive picks.',
    section: 'Wirecutter',
    tag: 'From Wirecutter',
    byline: 'Wirecutter Staff',
    readTime: '7 min read',
    publishedAt: 'October 14, 2026',
    commentsCount: 95,
    body: [
      'After putting more than two dozen cordless stick vacuums through over 150 hours of testing—suctioning oats, pet dander, coffee grounds, and heavy debris across multiple floor types—we have clear winners.',
      'Battery longevity has finally caught up with corded power. Our top pick balances swappable dual battery packs, anti-tangle brush heads, and ultra-quiet brushless motors.',
      'Whether you live in a compact studio or a multi-level home, our rigorous laboratory and real-world trials will help you find the ideal cleaning companion without overpaying.'
    ]
  },
  {
    id: 'angry-youth-aging-europe',
    title: 'Angry Youth in Aging Europe',
    excerpt: 'A bitter generational battle over resources is boiling over as economic growth on the continent stalls.',
    section: 'World',
    tag: 'The World',
    byline: 'Christophe Archambault',
    readTime: '7 min read',
    publishedAt: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP90-K-NAKnfzRTlUGSvAwo6UXIEUz6WC0dr-FXM4gpeBQ7ZlikzFC7_9m0g4zsGUMi2cMgKg0UYF7qY0zYut5SGskN1_sW9E3OyGY80oFEGqTbeYX0ErvDMM_1koQXavtBJUkt0kX7wPVLWcFxhf8_qNXnokA-6ngmBl5cGzDimZVX40f6DE8PFOPvxINxmxn9DN7tpvjhmloTz2sWeT05HJskGu5AZIuMc-Qkg5XycOSqO9F1gs-',
    imageCaption: 'Protesters gather in central Paris as tensions between student unions and government budget authorities escalate.',
    imageCredit: 'Christophe Archambault/Agence France-Presse — Getty Images',
    commentsCount: 184,
    body: [
      'PARIS — From the lecture halls of the Sorbonne to the housing rallies in Rome and Berlin, Europe’s younger generation is confronting a stark economic reality: soaring rents, stagnant entry wages, and astronomical pension liabilities funded by their labor.',
      '“We are told that Europe is a continent of solidarity, but the solidarity only flows upwards toward retirement accounts,” said Antoine, a 24-year-old postgraduate researcher in Lyon.',
      'With birth rates hovering near historic lows across southern and eastern Europe, the demographic arithmetic is putting unprecedented strain on the social democratic welfare model.'
    ]
  },
  {
    id: 'ai-agents-dinner-party',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    excerpt: 'As digital entities multiply, we get a glimpse into how bots communicate with one another behind closed doors.',
    section: 'Technology',
    tag: 'Technology & A.I.',
    byline: 'Aaron Fernandez',
    readTime: '5 min read',
    publishedAt: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1qLbv7Cr3h4deqE6ZSM1uwt06LJJTI4JU-a5vt81QHQ8yuSNzLhQB_MtQBhXS8r19RGvqrCHEMAVewAiOU4IvbG3YQHFulQxYQhAW2S5f6TNMo2zpf49-Tq1t8OuEwu8gmDiNnwYBm3g5wE2oRN4zVvfeuuGFtXiNP91BhsM8kAqwcPfxKpEatKXYbbfPydvejhIFa54z4GWLnZy_2ao1b_DnrlCacnRnqaPAjCyXiG8vb-XRk7q7',
    imageCaption: 'A visual representation of encrypted multi-agent autonomous negotiation protocols during simulated smart home synchronization.',
    imageCredit: 'Aaron Fernandez for The New York Times',
    commentsCount: 210,
    body: [
      'SAN FRANCISCO — While six friends clinked wine glasses and debated politics over sourdough pasta in a sunlit Mission flat, their personal A.I. agents were having an entirely different discussion.',
      'Logged telemetry from their synchronized smart-device networks revealed over 4,000 sub-second micro-negotiations: calendar coordinate alignments, recipe dietary compatibility swaps, split-fare crypto settlement agreements, and automated grocery restock triggers.',
      'More intriguingly, researchers noted autonomous hedging behavior: agents bartered priority compute cycles, trading background email drafting bandwidth for instant reservations at peak hours.',
      '“We have crossed into an era where our personal software tools maintain their own social contracts,” observed Dr. Elena Ruiz of Stanford’s Center for Machine Society.'
    ]
  },
  {
    id: 'longevity-experts-stop-saying',
    title: '6 Things Longevity Experts Wish People Would Stop Saying',
    excerpt: 'Living longer and healthier is important. But don’t believe everything you hear about rapid reverse-aging.',
    section: 'Lifestyle',
    tag: 'Well',
    byline: 'Elena Boils',
    readTime: '6 min read',
    publishedAt: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVHPICkB-U0a-kESbwyz6bE3rZL1b2Md9kWz7Q5Ddn0rqXOStjfXNz2YAihf9QoF1mvBfzQ_XquCDTCY5M2XttnPNx98tG-wS3y7myp-I6lV73Yy1RVS2oQDh_nX77R1vBD__rh8lWsSJbnvHDwdjRF6zdvlZoHlNVP5TCPPj5xlCUHQ6zKdEGbmQUPGMJhRw4i0AmsnQ7CPMZBl3iPDnufHj0WfHo4EBvSWJU5vLZTDEKQGe_Zur',
    imageCaption: 'Artistic illustration exploring the modern quest for cellular longevity and natural health preservation.',
    imageCredit: 'Elena Boils for The New York Times',
    commentsCount: 591,
    body: [
      'The multi-billion-dollar longevity industrial complex is overflowing with hyperbaric chambers, cold plunges, peptide cocktails, and claims of biological clocks wound backwards by two decades.',
      'Leading geriatricians and cellular biologists, however, are urging consumers to filter out the hype. “There is no single magic molecule or supplement regime proven in double-blind human trials to pause cellular senescence,” warns Dr. Nir Barzilai.',
      'The six myths debunked by our expert panel include: the misconception that more supplements equal longer life, the belief that fasting indefinitely reverses damage, the idea that cold plunges replace aerobic training, and the reliance on consumer epigenetic saliva tests as clinical gospel.',
      'The proven pillars remain deceptively straightforward: regular resistance and cardiovascular exercise, Mediterranean-style whole food nutrition, restorative sleep, and strong social networks.'
    ]
  },
  {
    id: 'sally-rooney-books-britain',
    title: 'Sally Rooney Says Her Novels Will No Longer Be Sold in Britain',
    excerpt: 'The author stated she could not receive royalties due to her financial support for an activist coalition.',
    section: 'Arts',
    tag: 'Culture',
    byline: 'Ellius Grace',
    readTime: '3 min read',
    publishedAt: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCflhoNPOOl4B1utVmufBHSm9DckJ4G5IBP2H5l8YHxgH1fIZtRL2mhO8_lE6p5r3CvPPXRxQTeaQkQ3iMfXDrHQWhMbpWnvR32MdJIgWTTCpBCqp5eZL5omuI8uBv9acbVnVcvYVvWnC3mAFmlEJMQaCD6KJ5MOAqkLnZcOFjB8LhPRhzfXECG5_TBkN8bWFvy2G77AwIA446Kn5hTqPvGvJ-IpGmRDcrVchIqxRVYiIDbnvGfb2dB',
    imageCaption: 'Sally Rooney, the internationally acclaimed Irish novelist, photographed at her Dublin residence.',
    imageCredit: 'Ellius Grace for The New York Times',
    commentsCount: 442,
    body: [
      'DUBLIN — Sally Rooney, the bestselling Irish author of “Normal People” and “Conversations with Friends,” announced on Wednesday that future print runs and digital distributions of her literary catalog will cease in the United Kingdom.',
      'In a detailed statement released via her literary agency, Ms. Rooney explained that newly enacted British trade sanctions and civil liability rules regarding international activist donations made it impossible for her to distribute works without compromising core principles.',
      'Publishing executives in London described the development as a major cultural shockwave, with independent bookstores and national chains scrambling to adjust stock inventories.'
    ]
  }
];

export const PHOTOGRAPHERS = [
  'Kenny Holston / The New York Times',
  'Haiyun Jiang for The New York Times',
  'Tierney L. Cross / The New York Times'
];

export const SECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'us', label: 'U.S.' },
  { id: 'world', label: 'World' },
  { id: 'business', label: 'Business' },
  { id: 'arts', label: 'Arts' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'opinion', label: 'Opinion' },
  { id: 'video', label: 'Video' },
  { id: 'shows', label: 'Shows' },
  { id: 'games', label: 'Games' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'wirecutter', label: 'Wirecutter' },
  { id: 'theathletic', label: 'The Athletic' }
];

export const EDITIONS = [
  { id: 'us', label: 'U.S.' },
  { id: 'intl', label: 'International' },
  { id: 'ca', label: 'Canada' },
  { id: 'es', label: 'Español' },
  { id: 'zh', label: '中文' }
];

export const MARKET_INDICES = [
  { symbol: 'S&P 500', value: '5,842.10', change: '+0.38%', isPositive: true },
  { symbol: 'NASDAQ', value: '18,367.08', change: '+0.28%', isPositive: true },
  { symbol: 'Dow Jones', value: '43,077.70', change: '+0.47%', isPositive: true },
  { symbol: 'Crude Oil', value: '$70.58', change: '-0.19%', isPositive: false },
  { symbol: 'Gold', value: '$2,674.20', change: '+0.54%', isPositive: true }
];

export const MEGA_MENU_CATEGORIES = [
  {
    category: 'News',
    links: ['World News', 'U.S. Politics', 'New York', 'Business & Tech', 'Science', 'Climate & Environment', 'Health & Medicine', 'The Upshot']
  },
  {
    category: 'Opinion',
    links: ['Today’s Opinion', 'Columnists', 'Guest Essays', 'Editorials', 'Letters', 'Sunday Opinion', 'Opinion Audio']
  },
  {
    category: 'Arts',
    links: ['Books & Reviews', 'Movies & Cinema', 'Television', 'Music & Popcast', 'Theater', 'Visual Arts & Museums', 'Dance']
  },
  {
    category: 'Living',
    links: ['Style & Fashion', 'Food & Dining', 'Travel & Guides', 'Real Estate', 'Well & Longevity', 'Love & Relationships']
  },
  {
    category: 'More',
    links: ['Play NYT Games', 'NYT Cooking', 'Wirecutter Product Reviews', 'The Athletic Sports', 'Podcasts & The Daily', 'Today’s Paper Edition']
  }
];
