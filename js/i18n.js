
function changeLanguage(lng) {
  i18next.changeLanguage(lng).then(function (t) {
    jQuery("*").localize();
    var resultLanguage = lng || i18next.language;

    switch (resultLanguage) {
      case "en":
        document.documentElement.lang = "en";
        jQuery('#flex-app-bar').css({
          'font-size': '1.3rem',
        });
        break;
      case "ja":
      default:
        document.documentElement.lang = "ja";
        jQuery('#flex-app-bar').css({
          'font-size': '2rem',
        });
        break;
    }
  });
}

// use plugins and options as needed, for options, detail see
// http://i18next.com/docs/
i18next.use(i18nextBrowserLanguageDetector).init({
  debug: true,
  fallbackLng: "ja",
  resources: {
    en: {
      translation: {
        title: "Kenta Tanaka - Ph.D Student at Osaka University",
        name: "Kenta Tanaka",
        profile: "Profile",
        fullname: "Full Name",
        affiliation: {
          affiliation: "Affiliation",
          former: "Dept. of Mechanical Engineering, ",
          latter: "Grad. Sch. of Engineering, Osaka Univ.",
          detail: "Ph.D Student of Mechanical Dynamics (Ishikawa & Minami Lab.), Dept. of Mechanical Engineering, Grad. Sch. of Engineering, Osaka Univ."
        },
        "fixed-app-bar": {
          affiliation: {
            former: "",
            latter: "Osaka Univ.",
          }
        },
        birth: {
          birth: "Birth",
          birthdate: "11 February 1999"
        },
        bio: {
          month: "Month",
          bio: "Biography",
          bio1: {
            date: "March 2017",
            detail: "Graduated from Higashi Katsushika Senior High School"
          },
          bio2: {
            date: "April 2017",
            detail: "Enrolled in Division of Mechanical, Materials and Manufacturing Science, School of Engineering, Osaka University"
          },
          bio3: {
            date: "March 2021",
            detail: "Graduated from Division of Mechanical, Materials and Manufacturing Science, School of Engineering, Osaka University"
          },
          bio4: {
            date: "April 2021",
            detail: "Enrolled in the Master's Program, Department of Mechanical Engineering, Osaka University"
          },
          bio5: {
            date: "March 2023",
            detail: "Graduated from the Master's Program, Department of Mechanical Engineering, Osaka University"
          },
          bio6: {
            date: "April 2023",
            detail: "Enrolled in the Doctoral Program, Department of Mechanical Engineering, Osaka University"
          }
        },
        publication: {
          publication: "Publications",
          domestic: {
            conference: "Domestic Conference (Japan)",
          },
          international: {
            conference: "International Conference",
            conference1: "Kenta Tanaka, Yuki Minami, Masato Ishikawa: NQLib: Python Library for the Practical Design of Noise Shaping Quantizers: SICE Annual Conference 2021",
            conference2: "Kenta Tanaka, Yuki Minami, Masato Ishikawa: Improving Controllability of Manual Control Systems by Altering Visual Information: 29th International Symposium on Artificial Life and Robotics (2024)",
          },
          awards: {
            awards: "Awards",
          },
          grant: {
            grant: "Research Grants",
          },
        },
        products: {
          products: "Products",
          product1: "iscie.bst",
          description1: "Unofficial BibTeX style file for ISCIE.",
          product2: "The Inverted Pendulum Game",
          description2: "A game to control an inverted pendulum. You can experience the effect of information alteration.",
        },
        contact: {
          contact: "Contact",
          lab: "Ishikawa & Minami Lab.",
          address: "Address",
          address1: "#505 M4 2-1 Yamadaoka,",
          address2: "Suita, Osaka 565-0871 Japan",
          email: "Email",
          phone: "Phone",
          phone1: "+81-6-6879-7267",
        },
      }
    },
    ja: {
      translation: {
        title: "田中 健太 - 大阪大学大学院工学研究科機械工学専攻博士後期課程学生",
        name: "田中 健太",
        profile: "プロフィール",
        fullname: "氏名",
        affiliation: {
          affiliation: "所属",
          former: "大阪大学大学院 工学研究科",
          latter: "機械工学専攻 ​博士後期課程",
          detail: "大阪大学大学院 工学研究科 機械工学専攻 ​博士後期課程 機械動力学領域 （石川・南研究室） 博士後期課程1年"
        },
        "fixed-app-bar": {
          affiliation: {
            former: "大阪大学大学院 工学研究科",
            latter: "機械工学専攻 ​博士後期課程",
          }
        },
        birth: {
          birth: "生年月日",
          birthdate: "1999年2月11日"
        },
        bio: {
          month: "年月",
          bio: "略歴",
          bio1: {
            date: "2017年3月",
            detail: "千葉県立東葛飾高等学校普通科 卒業"
          },
          bio2: {
            date: "2017年4月",
            detail: "大阪大学 工学部 応用理工学科 入学"
          },
          bio3: {
            date: "2021年3月",
            detail: "大阪大学 工学部 応用理工学科 卒業"
          },
          bio4: {
            date: "2021年4月",
            detail: "大阪大学大学院 工学研究科 機械工学専攻 博士前期課程 入学"
          },
          bio5: {
            date: "2023年3月",
            detail: "大阪大学大学院 工学研究科 機械工学専攻 博士前期課程 修了"
          },
          bio6: {
            date: "2023年4月",
            detail: "大阪大学大学院 工学研究科 機械工学専攻 博士後期課程 入学"
          }
        },
        publication: {
          publication: "業績",
          domestic: {
            conference: "国内会議",
            conference1: "田中 健太，南 裕樹，石川 将人：ノイズシェーピング量子化器設計のためのPython ライブラリNQLib の開発：第63 回自動制御連合講演会",
            conference2: "田中 健太，南 裕樹，石川 将人：人間機械系の制御性能向上のための視覚情報の改変， 第65回自動制御連合講演会，pp. 824–827 (2022/11)",
          },
          international: {
            conference: "国際会議",
            conference1: "Kenta Tanaka, Yuki Minami, Masato Ishikawa: NQLib: Python Library for the Practical Design of Noise Shaping Quantizers: SICE Annual Conference 2021",
            conference2: "Kenta Tanaka, Yuki Minami, Masato Ishikawa: Improving Controllability of Manual Control Systems by Altering Visual Information: 29th International Symposium on Artificial Life and Robotics (2024)",
          },
          awards: {
            awards: "受賞",
            award1: "空気調和・衛生工学会振興賞学生賞 (2020年度)",
            award2: "計測自動制御学会優秀学生賞 (2022年度)",
          },
          grant: {
            grant: "外部資金",
            grant1: "次世代挑戦的研究者育成プロジェクト (2023/4 - 2026/3)",
          },
        },
        products: {
          products: "制作物",
          product1: "iscie.bst",
          description1: "非公式のISCIE用BibTeXスタイルファイル．",
          product2: "The Inverted Pendulum Game",
          description2: "倒立振子を制御するゲームで，情報改変の効果を体験できます．",
        },
        contact: {
          contact: "連絡先",
          lab: "石川・南研究室",
          address: "住所",
          address1: "〒565-0871",
          address2: "大阪府吹田市山田丘２−１ M4棟 505号室",
          email: "メールアドレス",
          email1: "kenta.tanaka+at+eom.mech.eng.osaka-u.ac.jp",
          phone: "電話番号",
          phone1: "06-6879-7267",
        },
      },
    },
  }
}, function (err, t) {
  // for options see
  // https://github.com/i18next/jquery-i18next#initialize-the-plugin
  jqueryI18next.init(i18next, jQuery, { useOptionsAttr: true });

  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  changeLanguage();
});
