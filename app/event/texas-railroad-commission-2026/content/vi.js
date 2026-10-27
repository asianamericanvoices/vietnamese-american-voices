// Texas Railroad Commission voter guide — VIETNAMESE edition (VAV default).
// Line-for-line translation of the English master (filipino-american-voices/.../content/en.js).
// Candidate positions keep the same length, order and footnotes as the master; quoted
// campaign language is translated inside quotation marks “…”. Personal names stay in
// English (the surname "French" is never translated). Site chrome reuses the strings
// already on this site's Texas Elections 2026 hub page.

const vi = {
  edition: {
    lang: 'vi',
    locale: 'vi-VN',
    ogLocale: 'vi_VN',
    titleLanguage: 'vietnamese', // translatedTitles key for story headlines
  },

  meta: {
    title: 'Ủy ban Đường sắt Texas: những gì có trên lá phiếu của bạn',
    description: 'Hướng dẫn cử tri phi đảng phái về cuộc bầu cử Ủy ban Đường sắt Texas ngày 3 tháng 11 năm 2026: Ủy ban làm gì, cách bỏ phiếu, và so sánh song song ba ứng cử viên.',
  },

  site: {
    contact: 'Liên hệ',
    hubBarLabel: '🗳️ Sự kiện bầu cử quan trọng:',
    texasHub: '🗳️ Bầu cử Texas 2026',
    thisPage: 'Ủy ban Đường sắt Texas 2026',
    specialReport: 'Tin đặc biệt',
    categories: {
      all: 'Tất cả tin tức', General: 'Tổng hợp', 'US Politics': 'Chính trị Hoa Kỳ', Healthcare: 'Y tế',
      Education: 'Giáo dục', Immigration: 'Di trú', Economy: 'Kinh tế', Culture: 'Văn hóa', Sports: 'Thể thao',
    },
    votingButton: '🗳️ Thông tin cử tri Texas',
    votingSubline: 'Thông tin bỏ phiếu cho cư dân Texas • Đăng ký • Địa điểm bỏ phiếu • Ngày quan trọng',
    newsletterHeading: 'Đăng ký bản tin',
    newsletterBody: 'Nhận tin mới nhất ảnh hưởng đến cộng đồng Việt kiều.',
    newsletterPlaceholder: 'Nhập địa chỉ email',
    newsletterButton: 'Đăng ký',
    newsletterLoading: 'Đang đăng ký...',
    newsletterInvalid: 'Vui lòng nhập địa chỉ email hợp lệ',
    newsletterError: 'Đăng ký thất bại. Vui lòng thử lại sau',
    loadMore: 'Xem thêm bài viết',
    footerTagline: 'Tin tức độc lập và uy tín cho người Mỹ gốc Việt',
    footerAbout: 'Thông tin',
    footerMission: 'Sứ mệnh của chúng tôi',
    footerPrivacy: 'Chính sách bảo mật',
    footerTerms: 'Điều khoản sử dụng',
    footerRights: '© 2026 Tiếng Nói Việt Mỹ. Bảo lưu mọi quyền.',
  },

  ui: {
    carouselLabel: 'Tổng quan cuộc bầu cử Ủy ban Đường sắt Texas',
    slideOf: (n, total) => `Trang ${n} / ${total}`,
    prevSlide: 'Trang trước',
    nextSlide: 'Trang sau',
    goToSlide: (n) => `Đến trang ${n}`,
    listen: 'Nghe phần giải thích này',
    original: 'Bản gốc',
    originalHeadline: 'Tiêu đề gốc',
    candidateColumn: 'Ứng cử viên',
    sourcesHeading: 'Nguồn',
    lastUpdatedLabel: 'Cập nhật lần cuối',
    loading: 'Đang tải…',
    noStories: 'Chưa có bài viết nào.',
  },

  header: {
    title: 'Ủy ban Đường sắt Texas: những gì có trên lá phiếu của bạn',
    dateLine: 'Ngày Bầu cử: Thứ Ba, 3 tháng 11 · Bỏ phiếu sớm: 19–30 tháng 10',
  },

  slides: [
    {
      title: 'Ai đang tranh cử vào Ủy ban Đường sắt Texas',
      question: 'Các ứng cử viên được liệt kê theo thứ tự trên lá phiếu Texas, do luật tiểu bang quy định, không phải do Tiếng Nói Người Mỹ Gốc Việt.',
      // Mô tả ứng cử viên phỏng theo phần Hỏi & Đáp của Community Impact [5]; khu vực của Rosenthal theo [12a]
      candidates: [
        'Bo là một doanh nhân và là thế hệ thứ ba trong gia đình làm nghề dầu mỏ, với ba thập kỷ kinh nghiệm trong ngành.',
        'Jon Rosenthal là một kỹ sư và là dân biểu tiểu bang đại diện cho Tây Bắc Houston.',
        'Cựu lập trình viên máy tính, hiện đã nghỉ hưu.',
      ],
      note: 'Mô tả ứng cử viên phỏng theo phần Hỏi & Đáp của Community Impact, ngày 25 tháng 8 năm 2026 [5][12a] · Tiếng Nói Người Mỹ Gốc Việt dịch',
    },
    // Slides 2-5: câu trả lời đầy đủ của từng ứng cử viên cho cùng một câu hỏi của Community Impact [5],
    // do AAVM dịch. Theo thứ tự trên lá phiếu.
    {
      eyebrow: 'Lập trường chính · Theo lời của chính họ',
      title: 'Ưu tiên hàng đầu',
      question: 'Nếu đắc cử, ưu tiên hàng đầu của ông sẽ là gì?',
      quotes: true,
      candidates: [
        'Ưu tiên hàng đầu của tôi là khắc phục tình trạng kém hiệu quả về hành chính và các quy định quá rộng, để các nhà khai thác có thể sản xuất năng lượng với chi phí phải chăng hơn cho người tiêu dùng, đồng thời bảo vệ chủ đất và bịt kín thêm nhiều giếng bị bỏ hoang.',
        'Ủy ban Đường sắt nên đặt người dân Texas lên trên các nhóm lợi ích tài chính lớn, nhưng lại thiếu nguồn lực để làm điều đó một cách thỏa đáng. Tôi sẽ vận động tăng ngân sách để thực thi các quy định hiện hành và đáp ứng tốt hơn nhu cầu của cộng đồng. Chúng ta nên đơn giản hóa thủ tục cấp phép cho những bên hoạt động đúng đắn và áp dụng mức phạt nghiêm khắc đối với những bên vi phạm nghiêm trọng.',
        'Tôi muốn tôn trọng đầy đủ quyền sở hữu tài sản của chủ đất, và bảo đảm rằng quyền sở hữu tài sản luôn được ưu tiên hơn lợi ích của ngành. Minh bạch hơn. Đơn giản hóa và dọn dẹp 100 năm quy định.',
      ],
      note: 'Câu trả lời của các ứng cử viên cho cùng một bảng câu hỏi của Community Impact, ngày 25 tháng 8 năm 2026 [5] · Tiếng Nói Người Mỹ Gốc Việt dịch',
    },
    {
      eyebrow: 'Lập trường chính · Theo lời của chính họ',
      title: 'Quản lý ngành dầu khí',
      question: 'Ủy ban Đường sắt cần làm gì để quản lý hiệu quả nhất ngành dầu mỏ, khí đốt và các ngành liên quan của Texas?',
      quotes: true,
      candidates: [
        'Texas là một tiểu bang rộng lớn và đa dạng. Bằng cách điều chỉnh các quy định và hoạt động của Ủy ban cho phù hợp với môi trường và nhu cầu cụ thể ở từng nơi trong tiểu bang, thay vì áp dụng những quy tắc chung như nhau cho các nhà khai thác có quy mô khác nhau ở những môi trường khác nhau, chúng ta có thể giúp hoạt động sản xuất hiệu quả hơn mà vẫn có trách nhiệm.',
        'Chúng ta nên đơn giản hóa quy trình, giảm thời gian và chi phí cấp phép cho những bên hoạt động đúng đắn, để khuyến khích và thúc đẩy các nhà khai thác có trách nhiệm. Và chúng ta nên áp dụng mức phạt nặng cùng các yêu cầu nghiêm ngặt đối với những bên vi phạm nghiêm trọng. Vi phạm pháp luật phải chịu hậu quả, và chúng ta không được khen thưởng những công ty hoạt động ngoài giới hạn pháp luật.',
        'Chúng ta cần minh bạch hơn rất nhiều, và tránh tình trạng ‘cơ quan quản lý bị chi phối bởi ngành mình quản lý’ (regulatory capture). Nhiệm vụ của RRC không phải là quảng bá cho ngành dầu khí, mà là đưa ra những lựa chọn bảo đảm quyền sở hữu tài sản của mọi người dân Texas. Chúng ta cần cân bằng tốt hơn giữa quyền sử dụng bề mặt đất và quyền khoáng sản.',
      ],
      note: 'Câu trả lời của các ứng cử viên cho cùng một bảng câu hỏi của Community Impact, ngày 25 tháng 8 năm 2026 [5] · Tiếng Nói Người Mỹ Gốc Việt dịch',
    },
    {
      eyebrow: 'Lập trường chính · Theo lời của chính họ',
      title: 'Môi trường và an toàn',
      question: 'Ông sẽ thực hiện những bước nào để xử lý các rủi ro môi trường và vấn đề an toàn chung liên quan đến cơ sở hạ tầng dầu khí/đường ống của tiểu bang?',
      quotes: true,
      candidates: [
        'Là một chủ trang trại, tôi đã từng xử lý các vấn đề môi trường trên chính đất đai của mình. Tôi hiểu quan điểm của chủ đất và sẽ làm việc với ngành cũng như với các chủ đất để tìm ra giải pháp bảo vệ đất đai và môi trường của chúng ta, đồng thời vẫn cho phép sản xuất năng lượng một cách hiệu quả.',
        'Tôi sẽ vận động ngân sách để đẩy mạnh tối đa việc bịt kín giếng và làm sạch môi trường. Và tôi sẽ làm việc với các cộng đồng và các bên liên quan trong ngành để chấm dứt việc đốt bỏ khí thường xuyên (flaring), chống chịu thời tiết cho các cơ sở khí đốt tự nhiên, áp dụng các tiêu chuẩn khoảng cách an toàn (setback) chặt chẽ hơn, cùng nhiều biện pháp hợp lý khác nhằm giảm rủi ro môi trường, đồng thời bảo đảm ngành công nghiệp then chốt này tiếp tục phát triển mạnh.',
        'Việc bồi hoàn cần phải sẵn có trong các trường hợp tài sản bị thiệt hại do động đất, rò rỉ nước thải, v.v. Bảo hiểm, tiền ký quỹ bảo đảm (bonding) và các quỹ làm sạch do ngành hỗ trợ đều là những cách để hỗ trợ điều đó.',
      ],
      note: 'Câu trả lời của các ứng cử viên cho cùng một bảng câu hỏi của Community Impact, ngày 25 tháng 8 năm 2026 [5] · Tiếng Nói Người Mỹ Gốc Việt dịch',
    },
    {
      eyebrow: 'Lập trường chính · Theo lời của chính họ',
      title: 'Năng lượng tái tạo',
      question: 'Quan điểm của ông về tương lai của năng lượng tái tạo ở Texas là gì?',
      quotes: true,
      candidates: [
        'Nếu năng lượng tái tạo có thể giúp đáp ứng nhu cầu năng lượng của chúng ta, thì điều đó thật tuyệt. Tôi tin rằng các dự án này nên tự có hiệu quả kinh tế mà không cần các ưu đãi do tiền thuế của người dân tài trợ. Các dự án này có thể thành công hơn trong tương lai khi công nghệ phát triển.',
        'Tôi ủng hộ cách tiếp cận sử dụng mọi nguồn năng lượng (all-of-the-above) trong sản xuất năng lượng ở Texas. Nói thẳng ra – chúng ta cần tất cả nguồn điện mà chúng ta có thể có. Ngay cả trước khi tính đến các trung tâm dữ liệu, sự tăng trưởng bùng nổ của tất cả các ngành khác và sự gia tăng dân số đòi hỏi cách tiếp cận này. Chúng ta nên thúc đẩy mọi hình thức sản xuất năng lượng, bao gồm khí đốt tự nhiên, địa nhiệt và các nguồn tái tạo.',
        'Năng lượng tái tạo có thể rất tốt, nhưng nó phải cạnh tranh trên thị trường tự do với nhiên liệu hóa thạch. Chính phủ và các cơ quan quản lý của chúng ta không nên ưu ái hình thức này hơn hình thức khác.',
      ],
      note: 'Câu trả lời của các ứng cử viên cho cùng một bảng câu hỏi của Community Impact, ngày 25 tháng 8 năm 2026 [5] · Tiếng Nói Người Mỹ Gốc Việt dịch',
    },
    {
      title: 'Cách bỏ phiếu',
      bullets: [
        'Bỏ phiếu sớm: 19–30 tháng 10',
        'Ngày Bầu cử: Thứ Ba, 3 tháng 11, từ 7 giờ sáng đến 7 giờ tối',
        'Mang theo giấy tờ tùy thân có ảnh',
        'Tìm địa điểm bỏ phiếu và lá phiếu mẫu trên trang web văn phòng bầu cử quận của bạn hoặc VoteTexas.gov',
      ],
    },
  ],

  latest: {
    heading: 'Tin nổi bật',
    count: 4,
    note: 'Mục này được cập nhật khi có tin tức mới về bất kỳ ứng cử viên nào trong cuộc bầu cử này.',
  },

  explainer: {
    heading: 'Ủy ban Đường sắt làm gì',
    paragraphs: [
      'Dù mang tên như vậy, công việc ngày nay của Ủy ban Đường sắt Texas (Railroad Commission) là về năng lượng. Đây là cơ quan tiểu bang quản lý ngành dầu mỏ và khí đốt tự nhiên của Texas, các đường ống dẫn và các công ty tiện ích khí đốt tự nhiên [1], và công việc của Ủy ban bao gồm việc bịt kín các giếng dầu khí bị bỏ hoang [6]. Các quy định của Ủy ban ảnh hưởng đến những công ty khí đốt cung cấp cho các hộ gia đình, các cơ sở khí đốt mà Texas trông cậy vào khi thời tiết khắc nghiệt [6], và các gia đình sống gần các khu vực khoan và đường ống.',
      'Ủy ban có ba thành viên [1], được bầu trên toàn tiểu bang với nhiệm kỳ sáu năm so le nhau. Năm nay có một ghế được đưa ra bầu [2].',
      'Trên lá phiếu của bạn, cuộc bầu cử này xuất hiện cùng với các chức vụ cấp tiểu bang khác, sau thống đốc, phó thống đốc, bộ trưởng tư pháp, tổng kiểm soát tài chính (comptroller), ủy viên đất đai và ủy viên nông nghiệp [4].',
    ],
  },

  howToVote: {
    heading: 'Cách bỏ phiếu ở Texas',
    items: [
      { lead: 'Bỏ phiếu sớm:', text: 'Từ Thứ Hai, 19 tháng 10 đến Thứ Sáu, 30 tháng 10, tại bất kỳ địa điểm bỏ phiếu sớm nào trong quận của bạn [13].' },
      { lead: 'Ngày Bầu cử:', text: 'Thứ Ba, 3 tháng 11 [13]. Các phòng phiếu mở cửa từ 7 giờ sáng đến 7 giờ tối theo giờ địa phương [14].' },
      { lead: 'Mang theo giấy tờ tùy thân có ảnh,', text: 'chẳng hạn như bằng lái xe Texas, thẻ căn cước cá nhân Texas hoặc hộ chiếu Hoa Kỳ [12].' },
      { lead: 'Tìm địa điểm bỏ phiếu và lá phiếu mẫu', text: 'trên trang web văn phòng bầu cử quận của bạn hoặc tại VoteTexas.gov [12].' },
    ],
  },

  candidatesSection: {
    heading: 'So sánh song song các ứng cử viên',
    intro: 'Về phần này: Cả ba ứng cử viên được giới thiệu theo cùng một định dạng, dựa trên các bản tin, trang web vận động tranh cử và một bảng câu hỏi của Community Impact mà tất cả họ đều đã trả lời [5], và được liệt kê theo thứ tự trên lá phiếu Texas [3]. Mục “Trên tin tức” xuất hiện khi các phát biểu hoặc hành vi trong chiến dịch của một ứng cử viên được ít nhất hai tổ chức tin tức uy tín đưa tin và bị chỉ trích bởi những người ngoài các đối thủ chính trị của ứng cử viên đó; mục này có kèm phản hồi của ứng cử viên. Tiếng Nói Người Mỹ Gốc Việt không ủng hộ ứng cử viên nào.',
    rows: [
      { key: 'work', label: 'Kinh nghiệm làm việc' },
      { key: 'office', label: 'Chức vụ công hoặc chức vụ trong đảng' },
      { key: 'endorsements', label: 'Sự ủng hộ đáng chú ý' },
      { group: 'Lập trường của họ về…' },
      { key: 'bills', label: 'Hóa đơn năng lượng của bạn' },
      { key: 'wells', label: 'Các giếng dầu khí cũ' },
      { key: 'drilling', label: 'Sống gần khu vực khoan' },
      { key: 'renewables', label: 'Năng lượng tái tạo' },
      { key: 'website', label: 'Trang web vận động tranh cử' },
    ],
    backgroundLabel: 'Lý lịch.',
    inWordsLabel: 'Theo lời ông.',
    endorsementsLabel: 'Sự ủng hộ đáng chú ý.',
    inTheNewsLabel: 'Trên tin tức.',
  },

  candidateText: {
    french: {
      party: 'Cộng hòa',
      table: {
        work: 'Nhà giao dịch năng lượng từ năm 1994; chủ trang trại và chủ sở hữu quyền khoáng sản; từng sở hữu các doanh nghiệp an ninh ở Trung Đông [8]. Gia đình điều hành một doanh nghiệp dầu mỏ ở Midland [6]',
        office: 'Cựu chủ tịch Đảng Cộng hòa Quận Tarrant [6]',
        endorsements: 'Thống đốc Greg Abbott; Phó Thống đốc Dan Patrick; các Ủy viên Ủy ban Đường sắt Christi Craddick và Wayne Christian [17][8]; Texas Alliance of Energy Producers [18]; Texas Oil and Gas Association PAC, tổ chức đã lên án bài đăng ngày 13 tháng 9 của Bo French nhưng tính đến ngày 15 tháng 9 vẫn chưa rút lại sự ủng hộ [7c][19]',
        bills: 'Cắt giảm sự kém hiệu quả về hành chính và các quy định quá rộng để giảm chi phí năng lượng [5]',
        wells: 'Bịt kín thêm nhiều giếng bị bỏ hoang [5]',
        drilling: 'Làm việc với ngành và các chủ đất để bảo vệ đất đai và môi trường [5]',
        renewables: 'Ủng hộ năng lượng tái tạo nếu có hiệu quả kinh tế mà không cần ưu đãi từ tiền thuế [5]',
      },
      background: 'Bo French lớn lên ở Midland [8], nơi gia đình ông điều hành một doanh nghiệp dầu mỏ [6]. Ông gia nhập ngành năng lượng năm 1994 và làm nhà giao dịch năng lượng trong một thập kỷ, và cho biết ông từng sở hữu và điều hành các doanh nghiệp an ninh ở Trung Đông [8]. Ông là cựu chủ tịch Đảng Cộng hòa Quận Tarrant [6]. Ông giành được đề cử của Đảng Cộng hòa sau khi đánh bại Ủy viên đương nhiệm Jim Wright trong vòng bầu cử quyết định (runoff) hồi tháng 5 [6].',
      inTheNews: 'Ngày 13 tháng 9, Bo French đăng một bức ảnh chụp các sinh viên Đại học Texas (University of Texas) trên khán đài tại một trận bóng bầu dục, sau đó viết rằng trường đại học này ưu tiên “người nước ngoài hơn người Texas”; các lãnh đạo Đảng Cộng hòa, trong đó có Thượng nghị sĩ John Cornyn và Chủ tịch Hạ viện Texas Dustin Burrows, đã chỉ trích bài đăng là phân biệt chủng tộc [7a][25]. Sau đó, hai sinh viên trong ảnh cho tờ The Dallas Morning News biết họ là công dân Hoa Kỳ [26]. Bo French bảo vệ bài đăng, nói rằng: “vấn đề lớn hơn là, chúng ta sẽ có những chính sách ưu tiên người Mỹ – hay chúng ta sẽ có những chính sách ưu tiên người nước ngoài?” [7a]',
      inWords: 'Bo French cho biết các ưu tiên của ông là giảm sự kém hiệu quả về hành chính và các quy định quá rộng để giảm chi phí năng lượng, bảo vệ chủ đất, và bịt kín thêm nhiều giếng bị bỏ hoang [5]. Chiến dịch của ông cho biết ông đã cam kết “chấm dứt DEI, các quy định hà khắc, và ảnh hưởng của Hồi giáo cực đoan và ĐCSTQ (CCP) trong ngành dầu mỏ Texas” [8], và thực thi lệnh cấm của Cơ quan Lập pháp Texas đối với việc sở hữu đất của các thế lực nước ngoài thù địch [8]. Ông cho rằng Ủy ban trao hơn 1 triệu đô la mỗi năm cho các hợp đồng dựa trên tiêu chí đa dạng, công bằng và hòa nhập, và muốn chấm dứt việc này [6]. Ông gọi việc sử dụng nước là thách thức lớn nhất mà Texas phải đối mặt trong năm năm tới [5].',
    },
    rosenthal: {
      party: 'Dân chủ',
      table: {
        work: 'Kỹ sư với khoảng 25 năm làm việc trong và xung quanh ngành dầu khí [12a]',
        office: 'Dân biểu tiểu bang đại diện cho Tây Bắc Houston tại Hạ viện Texas [12a]',
        endorsements: 'Ban biên tập của Houston Chronicle, Dallas Morning News và Austin American-Statesman [20][21][22]; Texas AFL-CIO [23]; Sierra Club [18]',
        bills: 'Giữ giá khí đốt công bằng và giảm hóa đơn [9]; chống chịu thời tiết cho các cơ sở khí đốt trước thời tiết khắc nghiệt [6]',
        wells: 'Phí mới đối với việc xử lý nước muối (nước thải từ mỏ dầu); nâng mức tiền bảo lãnh và tiền ký quỹ của các nhà khai thác [6]',
        drilling: 'Khoảng cách an toàn (setback) chặt chẽ hơn; đáp ứng tốt hơn nhu cầu của cộng đồng [5]',
        renewables: 'Ủng hộ các chiến lược năng lượng “sử dụng mọi nguồn” (All of the Above), khuyến khích năng lượng mặt trời, gió, địa nhiệt và hydro [15][16]',
      },
      background: 'Jon Rosenthal là một kỹ sư đã làm việc khoảng 25 năm trong và xung quanh ngành dầu khí, và đại diện cho Tây Bắc Houston tại Hạ viện Texas [12a]. Ông không có đối thủ trong cuộc bầu cử sơ bộ của Đảng Dân chủ [6].',
      inTheNews: 'Tính đến ngày 18 tháng 10, chưa có vấn đề nào đáp ứng tiêu chuẩn của hướng dẫn này được đưa tin.',
      inWords: 'Chiến dịch của Jon Rosenthal liệt kê các ưu tiên bao gồm “Đặt người dân Texas lên trên các nhóm lợi ích đặc biệt” và “Giữ cho sưởi ấm và đèn điện luôn BẬT & Giảm hóa đơn” [9]. Ông cho biết ông sẽ tìm kiếm thêm ngân sách thực thi cho Ủy ban, cấp phép nhanh hơn cho các nhà khai thác có trách nhiệm và phạt nặng những bên vi phạm nghiêm trọng [5]. Ông đề xuất một khoản phí mới đối với việc xử lý nước muối và nâng mức tiền bảo lãnh và tiền ký quỹ của các nhà khai thác để chi trả cho việc bịt kín giếng [6], chống chịu thời tiết cho các cơ sở khí đốt tự nhiên trước thời tiết khắc nghiệt [6], chấm dứt việc đốt bỏ khí thường xuyên, và áp dụng khoảng cách an toàn chặt chẽ hơn [5].',
    },
    dibianca: {
      party: 'Tự do (Libertarian)',
      table: {
        work: 'Lập trình viên đã nghỉ hưu; từng làm việc cho Sở Giao thông Vận tải Texas [11]',
        office: 'Không có; nhà hoạt động lâu năm của Đảng Tự do (Libertarian) [10]',
        endorsements: 'Chưa có thông tin tính đến ngày 18 tháng 10. Ứng cử viên được đề cử của Đảng Tự do Texas (Libertarian Party of Texas) [24]',
        bills: 'Tiếp cận cạnh tranh đối với đường ống và thị trường thay vì bảo hộ độc quyền [10]',
        wells: 'Các nhà khai thác chịu trách nhiệm bịt kín giếng và làm sạch; dùng tiền ký quỹ bảo đảm và bảo hiểm thay vì giải cứu bằng tiền thuế [10]',
        drilling: 'Đặt quyền sở hữu tài sản của chủ đất lên trên lợi ích của ngành [5]',
        renewables: 'Mọi nguồn năng lượng nên cạnh tranh mà không có trợ cấp hay quy định bắt buộc [11]',
      },
      background: 'Arthur DiBianca quê gốc ở San Antonio, là một lập trình viên đã nghỉ hưu và từng làm việc cho Sở Giao thông Vận tải Texas [11]. Ông sống ở Austin và đã là nhà hoạt động của Đảng Tự do trong nhiều năm [10].',
      inTheNews: 'Tính đến ngày 18 tháng 10, chưa có vấn đề nào đáp ứng tiêu chuẩn của hướng dẫn này được đưa tin.',
      inWords: 'Arthur DiBianca cho rằng Ủy ban không nên quảng bá cho ngành mà mình quản lý mà phải bảo đảm quyền sở hữu tài sản cho mọi người dân Texas, ưu tiên chủ đất hơn lợi ích của ngành, và ông sẽ đơn giản hóa các quy định của Ủy ban và cải thiện tính minh bạch [5]. Chiến dịch của ông cho biết sẽ “buộc các nhà khai thác chịu trách nhiệm về việc bịt kín giếng và làm sạch” và “khuyến khích thị trường bảo lãnh và bảo hiểm xử lý các rủi ro môi trường thay vì giải cứu bằng tiền thuế” [10]. Ông ủng hộ “một cơ cấu năng lượng sử dụng mọi nguồn mà không có trợ cấp hay quy định bắt buộc của chính phủ” [11].',
    },
  },

  coverage: {
    heading: 'Tin tức về cuộc bầu cử',
    intro: 'Các bài tường thuật về cuộc bầu cử này từ những tòa soạn uy tín ở Texas, do Tiếng Nói Người Mỹ Gốc Việt dịch và ghi nguồn cơ quan báo chí gốc.',
  },

  footer: {
    disclaimer: 'Tiếng Nói Người Mỹ Gốc Việt không ủng hộ ứng cử viên nào.',
    photoCredit: 'Ảnh do các chiến dịch tranh cử của ứng cử viên cung cấp cho Community Impact.',
    corrections: 'Đính chính: nếu bạn thấy có sai sót, vui lòng gửi email đến',
    correctionsEmail: 'contact@tiengnoinguoimygocviet.us', // site's public contact address; never a personal email
  },
};

export default vi;
