import { Ministry, Sermon, ChurchLeader, Announcement, GalleryPhoto, GivingCategory } from '../types/church';

export const CHURCH_INFO = {
  name: "ACK St. Mary's Ngariama Church",
  diocese: "Anglican Church of Kenya, Diocese of Kirinyaga",
  location: "Ngariama Location, Gichugu Sub-County, Kirinyaga County, Kenya",
  postalAddress: "P.O. Box 142 - 10302, Kianyaga, Kirinyaga",
  phone: "0700000000",
  phoneIntl: "+254700000000",
  email: "info@stmarysngariama.org",
  themeYear: "Remaining in Christ & Bearing Fruit (John 15:5)",
  motto: "Rooted in Faith, Growing in Love, Serving with Grace",
  bishop: "Rt. Rev. Joseph Kibucwa (Bishop of Kirinyaga)",
  vicar: "Rev. Canon E. K. Murimi",
  paybillNumber: "247247", // Equity / Church standard Paybill
  altPaybillNumber: "522522", // KCB Paybill
  bankAccount: "01129000000000",
  buildingProject: {
    title: "Parish Sanctuary Roofing & Expansion Project",
    targetKES: 3500000,
    raisedKES: 2150000,
    donorsCount: 384,
  }
};

export const GIVING_CATEGORIES: GivingCategory[] = [
  {
    id: 'tithe',
    name: 'Tithe (Fungu la Kumi)',
    accountSuffix: 'TITHE',
    description: '10% of your earnings returned to the Lord for the sustenance of ministry.',
    popular: true,
  },
  {
    id: 'offering',
    name: 'Sunday Offering (Sadaka)',
    accountSuffix: 'OFFERING',
    description: 'General Sunday collection supporting parish operations and outreach.',
    popular: true,
  },
  {
    id: 'roofing',
    name: 'Sanctuary Roofing & Building Fund',
    accountSuffix: 'ROOF',
    description: 'Targeted capital development for the new church sanctuary and hall roof.',
    popular: true,
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving (Shukrani)',
    accountSuffix: 'THANKS',
    description: 'Offerings of gratitude for birthdays, harvest, health, promotions, and family blessings.',
  },
  {
    id: 'needy',
    name: 'Benevolence & Needy Fund',
    accountSuffix: 'BENEVOLENCE',
    description: 'Providing food, school fees assistance, and support for vulnerable families in Ngariama.',
  },
  {
    id: 'kama',
    name: 'KAMA Men\'s Ministry',
    accountSuffix: 'KAMA',
    description: 'Men’s fellowship activities, fatherhood seminars, and diocesan projects.',
  },
  {
    id: 'mu',
    name: 'Mothers\' Union (MU)',
    accountSuffix: 'MU',
    description: 'Women\'s mission, family life counseling, and diocesan conferences.',
  },
  {
    id: 'kayo',
    name: 'KAYO Youth Ministry',
    accountSuffix: 'YOUTH',
    description: 'Youth praise instruments, camps, outreach, and mentorship programs.',
  },
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'kama',
    name: "Kenya Anglican Men's Association",
    shortName: 'KAMA',
    badge: "Men's Ministry",
    leader: 'Mr. Peter Kamau',
    meetingTime: '1st Sunday of Every Month, 2:00 PM',
    description: 'Mobilizing and equipping men of the parish to be godly fathers, husbands, and stewards in the church and society.',
    scripture: 'As for me and my house, we will serve the Lord. — Joshua 24:15',
    icon: 'Shield',
    activities: [
      'Monthly men’s prayer breakfast and fellowship',
      'Fatherhood and marriage mentorship workshops',
      'Community work and parish development maintenance',
      'Annual Diocesan KAMA convention'
    ]
  },
  {
    id: 'mothers-union',
    name: "Mothers' Union",
    shortName: 'MU',
    badge: "Women's Ministry",
    leader: 'Mrs. Beatrice Muthoni',
    meetingTime: '2nd Saturday of Every Month, 2:30 PM',
    description: 'Promoting stable family life, Christian parenting, mutual prayer, and extending compassionate care to vulnerable households.',
    scripture: 'She speaks with wisdom, and faithful instruction is on her tongue. — Proverbs 31:26',
    icon: 'HeartHandshake',
    activities: [
      'Weekly home visitation and fellowship in Christian homesteads',
      'Premarital guidance and young wives counseling',
      'Hospital and elderly home visitation in Ngariama',
      'Diocesan Mothers’ Union annual rally and projects'
    ]
  },
  {
    id: 'kayo',
    name: "Kenya Anglican Youth Organization",
    shortName: 'KAYO',
    badge: 'Youth & Young Adults',
    leader: 'Mr. Dennis Murimi',
    meetingTime: 'Every Sunday, 11:30 AM & Saturday 4:00 PM',
    description: 'Empowering teenagers and young adults in Ngariama to deepen their faith, develop talents, and stand bold for Christ.',
    scripture: 'Don’t let anyone look down on you because you are young, but set an example. — 1 Timothy 4:12',
    icon: 'Flame',
    activities: [
      'High-energy praise and contemporary worship band',
      'Career mentorship, digital skills, and entrepreneurship talks',
      'Annual youth camp and sports evangelism cup',
      'Community clean-ups and environmental conservation'
    ]
  },
  {
    id: 'sunday-school',
    name: "Sunday School & Children's Brigade",
    shortName: 'Sunday School',
    badge: 'Children (Ages 3-14)',
    leader: 'Teacher Mary Wanjiru',
    meetingTime: 'Every Sunday at 8:30 AM (Parish Hall)',
    description: 'Laying a solid biblical foundation for our young ones through scripture memorization, music, puppet drama, and fun interactive lessons.',
    scripture: 'Start children off on the way they should go, and even when they are old they will not turn from it. — Proverbs 22:6',
    icon: 'Sparkles',
    activities: [
      'Age-graded Bible lessons with creative activity sheets',
      'Singing, dancing, and memory verse recitations',
      'Vacation Bible School (VBS) during August school holidays',
      'Annual Children\'s Harvest and Thanksgiving celebration'
    ]
  },
  {
    id: 'choir',
    name: "Parish Choir & Praise Team",
    shortName: 'Choir & Praise',
    badge: 'Worship & Music',
    leader: 'Choirmaster Samuel Kariuki',
    meetingTime: 'Tuesdays & Fridays, 5:30 PM',
    description: 'Leading the congregation into reverent worship through sacred Anglican hymns, traditional Kikuyu canticles, and uplifting contemporary praise.',
    scripture: 'Sing to the Lord a new song; sing to the Lord, all the earth. — Psalm 96:1',
    icon: 'Music',
    activities: [
      'Leading choral liturgy in Holy Communion and Mattins',
      'Vocal harmony and brass/organ accompaniment training',
      'Diocesan music festivals and carol services',
      'Recording parish worship songs and anthems'
    ]
  },
  {
    id: 'evangelism',
    name: "Mission & Evangelism Department",
    shortName: 'Evangelism',
    badge: 'Outreach & Missions',
    leader: 'Evangelist Paul Njeru',
    meetingTime: 'Thursdays, 5:00 PM',
    description: 'Carrying the Great Commission to homesteads, market centers, schools, and tea estates across Gichugu Division.',
    scripture: 'Go into all the world and preach the gospel to all creation. — Mark 16:15',
    icon: 'Compass',
    activities: [
      'Door-to-door village evangelism in Ngariama',
      'Open air crusades and parish revivals',
      'Follow-up and discipleship for new converts',
      'Distribution of Bibles and Christian tracts'
    ]
  }
];

export const SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: "Abiding in the True Vine for Maximum Fruitfulness",
    preacher: "Rev. Canon E. K. Murimi",
    role: "Vicar / Parish Priest",
    date: "September 27, 2026",
    duration: "38 mins",
    passage: "John 15:1-8",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "Sunday Service",
    summary: "A profound exposition on the secret of Christian vitality: remaining deeply connected to Christ amidst the pressures of work, family, and modern culture.",
    keyPoints: [
      "Separated from the vine, the branch has zero vitality or purpose.",
      "Pruning is not punishment; it is God's divine preparation for greater fruit.",
      "Bearing fruit brings supreme glory to the Father and deep joy to the believer."
    ]
  },
  {
    id: 'sermon-2',
    title: "The Holy Communion: Remembrance, Covenant & Unity",
    preacher: "Rev. Grace Wambui",
    role: "Curate & Assisting Minister",
    date: "September 20, 2026",
    duration: "34 mins",
    passage: "1 Corinthians 11:23-29",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "Holy Communion",
    summary: "Understanding the reverent depth of the Lord's Table, self-examination, and reconciliation with our brothers and sisters before taking the sacrament.",
    keyPoints: [
      "The Table of the Lord is a celebration of victorious redemption.",
      "Examination of heart: forgiveness must precede receiving the elements.",
      "One bread, one body: our communion binds us as an undivided family."
    ]
  },
  {
    id: 'sermon-3',
    title: "Raising Godly Altars in our Families and Homes",
    preacher: "Evangelist Paul Njeru",
    role: "Diocesan Lay Reader",
    date: "September 13, 2026",
    duration: "42 mins",
    passage: "Genesis 12:1-8 & Joshua 24:14-15",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "Special",
    summary: "Rebuilding the family altar through consistent prayer, family scripture reading, and godly character modeling in our homes across Kirinyaga.",
    keyPoints: [
      "Children learn what they see lived out far more than what they are told.",
      "A home with a regular altar of prayer withstands the storms of life.",
      "Dedicate your children and enterprises to the Lord with intentionality."
    ]
  }
];

export const LEADERS: ChurchLeader[] = [
  {
    id: 'leader-1',
    name: "Rev. Canon E. K. Murimi",
    title: "Parish Vicar & Shepherd",
    role: "Parish Priest",
    bio: "Guiding the flock with over 22 years in pastoral ministry within the Diocese of Kirinyaga. Dedicated to expository preaching and community transformation.",
    department: "Clergy & Parish Leadership",
    phone: "0700000000"
  },
  {
    id: 'leader-2',
    name: "Rev. Grace Wambui",
    title: "Curate & Pastoral Care Minister",
    role: "Pastoral Care & Youth Clergy",
    bio: "Passionate about discipleship, youth ministry, and home visitation. Coordinates pastoral counseling and baptism classes.",
    department: "Pastoral Care & Youth"
  },
  {
    id: 'leader-3',
    name: "Mr. Peter Kamau",
    title: "People's Warden",
    role: "Parish Warden",
    bio: "Ensuring smooth operations, sound governance, and looking after member welfare and church assets with transparency and integrity.",
    department: "Parish Council & Operations"
  },
  {
    id: 'leader-4',
    name: "Mrs. Beatrice Muthoni",
    title: "Vicar's Warden",
    role: "Parish Warden",
    bio: "Serving as the liaison between clergy and the parish council, overseeing spiritual order and church development programs.",
    department: "Parish Council"
  },
  {
    id: 'leader-5',
    name: "Mrs. Mary Wanjiru",
    title: "Parish Secretary",
    role: "Secretary & Administration",
    bio: "Managing church records, registry for baptisms and confirmations, weekly announcements, and parish correspondence.",
    department: "Administration"
  },
  {
    id: 'leader-6',
    name: "Mr. James Mwangi",
    title: "Parish Treasurer",
    role: "Finance & Stewardship",
    bio: "Overseeing accountable financial management, development funds, M-Pesa records, and annual audit reports.",
    department: "Finance & Stewardship"
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: "Main Sanctuary Roofing & Harambee Thanksgiving",
    category: "Harambee",
    date: "Sunday, October 18, 2026",
    time: "9:30 AM",
    venue: "Main Church Sanctuary",
    summary: "Special Thanksgiving and fundraising service for the completion of modern iron roofing and ceiling.",
    details: "All parishioners, friends, and well-wishers in the diaspora are warmly invited. You may give directly via Paybill 247247, Account ROOF-YourName. Let us build the house of the Lord together!",
    highlight: true,
  },
  {
    id: 'ann-2',
    title: "KAYO Youth Fellowship Sunday & Talent Showcase",
    category: "Youth",
    date: "Sunday, October 25, 2026",
    time: "9:00 AM",
    venue: "Church Grounds",
    summary: "The youth department will minister in songs, drama, and word under the theme 'Youth Standing for Truth'.",
    details: "Parents and church members are encouraged to support our young people as they showcase their God-given gifts and lead the main morning liturgy.",
  },
  {
    id: 'ann-3',
    title: "Diocesan Mothers' Union Annual Conference Preparation",
    category: "Mothers Union",
    date: "Saturday, November 7, 2026",
    time: "2:00 PM",
    venue: "Parish Hall",
    summary: "All enrolled MU members and prospective candidates to attend preparation and uniform briefing.",
    details: "Briefing on logistics, travel arrangements to St. Thomas Cathedral Kerugoya, and presentation of the parish banner.",
  },
  {
    id: 'ann-4',
    title: "Catechism & Confirmation Classes Enrollment",
    category: "Service",
    date: "Registration Ongoing",
    time: "Sundays at 8:00 AM",
    venue: "Vicar's Vestry",
    summary: "Candidates aged 12 and above wishing to be confirmed by the Bishop of Kirinyaga should register.",
    details: "12-week comprehensive instruction covering the Apostles' Creed, The Lord's Prayer, Ten Commandments, and Anglican Sacraments.",
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: "Sunday Choral Praise in Full Vestments",
    category: "Choir",
    caption: "The parish choir leading the congregation in singing traditional Kikuyu and English hymns during Holy Communion.",
    date: "September 2026",
    imageUrl: "https://images.unsplash.com/photo-1510972527921-ce6c2a44f369?q=80&w=800&auto=format&fit=crop",
    fallbackGradient: "from-purple-900 to-indigo-950"
  },
  {
    id: 'gal-2',
    title: "Sunday School Children's Bible Recitation",
    category: "Community",
    caption: "Our vibrant Sunday School learners reciting Psalm 23 during the Family Service Sunday.",
    date: "August 2026",
    imageUrl: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?q=80&w=800&auto=format&fit=crop",
    fallbackGradient: "from-amber-800 to-stone-900"
  },
  {
    id: 'gal-3',
    title: "Parishioners in Warm Outdoor Fellowship",
    category: "Fellowship",
    caption: "Members sharing a cup of tea and joyous conversation after the Sunday service under church trees.",
    date: "September 2026",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop",
    fallbackGradient: "from-green-900 to-stone-900"
  },
  {
    id: 'gal-4',
    title: "Parish Sanctuary & Bell Tower",
    category: "Worship",
    caption: "ACK St. Mary's Ngariama sanctuary grounds set against the scenic Kirinyaga countryside.",
    date: "Current Season",
    imageUrl: "https://z-cdn-media.chatglm.cn/files/ee47dfa2-d4b7-4007-9995-73ee949e1387.jpg?auth_key=1883882766-f3d96f7536104261849591129155b629-0-708dd0377892df4e0dcd3da84478a015",
    fallbackGradient: "from-purple-950 to-slate-900"
  },
  {
    id: 'gal-5',
    title: "KAYO Youth Ministry Camp & Music",
    category: "Youth",
    caption: "Young believers worshiping through song, acoustic instruments, and scripture reflection.",
    date: "July 2026",
    imageUrl: "https://images.unsplash.com/photo-1601142634808-38923eb7c560?q=80&w=800&auto=format&fit=crop",
    fallbackGradient: "from-amber-900 to-purple-950"
  },
  {
    id: 'gal-6',
    title: "United Congregation Prayer & Intercession",
    category: "Worship",
    caption: "The congregation standing together in prayer for the sick, the nation, and our community.",
    date: "August 2026",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop",
    fallbackGradient: "from-stone-900 to-purple-900"
  }
];

export const SERVICE_SCHEDULE = [
  {
    time: "8:30 AM — 9:30 AM",
    title: "Sunday School & Children's Ministry",
    venue: "Parish Sunday School Hall",
    description: "Bible lessons, singing, memory verses, and craft activities for children aged 3 to 14.",
    target: "Children & Brigade"
  },
  {
    time: "9:00 AM — 11:30 AM",
    title: "Sunday Main Liturgy & Word",
    venue: "Main Sanctuary",
    description: "Anglican Morning Prayer / Mattins (1st & 3rd Sunday Holy Communion; 2nd & 4th Sunday Service of the Word).",
    target: "Entire Parish & Visitors"
  },
  {
    time: "11:30 AM — 1:00 PM",
    title: "KAYO Youth Service & Discipleship",
    venue: "Youth Chapel / Main Hall",
    description: "Contemporary worship, interactive topical discussion, youth fellowship, and prayers.",
    target: "Youth & Young Adults"
  },
  {
    time: "Every Wednesday 5:00 PM",
    title: "Midweek Fellowship & Bible Study",
    venue: "Sanctuary / Small Hall",
    description: "Deep verse-by-verse scriptural exploration, intercession for parish families, and testimony sharing.",
    target: "All Church Members"
  },
  {
    time: "Every 1st Friday 9:00 PM",
    title: "Kesha (Overnight Prayer Vigil)",
    venue: "Main Sanctuary",
    description: "Monthly vigil of fervent praise, spiritual warfare, healing prayers, and waiting on God.",
    target: "All Parishioners"
  }
];
