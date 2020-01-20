export default {
  app: {
    name: "SocialLibrary",
    ignoredFiles: [{
      name: "asdas",
       _id: "61489883918264",
    },{
      name: "dffff",
       _id: "614892323883918264",
    }],
    models: [
      {
        name: "Author",
        plural: "Authors",
        type: "Account",
        properties: [
          {
            name: "favBooks",
            type: "ManyToMany",
            _id: "61489883918264",
            oneToOneRelation: "34286625690291.name",
            manyToManyRelation: "34286625690291.name",
            manyToManyReverseFieldName: "favouritedBy",
            validators: [],
            relation: "34286625690291.name"
          },
          {
            name: "age",
            type: "Number",
            template: "Number",
            _id: "38002057164750",
            validators: [],
            required: true,
            requiredMessage: "Age is required"
          },
          {
            name: "isFictional",
            type: "Boolean",
            _id: "38825811427866",
            trueStrings: [
              {value: "group of people", _id: "49729204224279"},
              {value: "anonymous", _id: "51245831609104"}
            ],
            template: "Boolean",
            falseStrings: [],
            required: true,
            unique: true,
            default: "false"
          },
          {
            _id: "59909358254229",
            name: "publishers",
            type: "ManyToMany",
            oneToManyRelation: "20825084921224.name",
            template: "String",
            manyToManyRelation: "20825084921224.name",
            manyToManyReverseFieldName: "authors",
            relation: "20825084921224.name"
          },
          {
            name: "favBook",
            type: "OneToOne",
            oneToOneRelation: "34286625690291.name",
            relation: "34286625690291.name"
          },
          {
            name: "hashed_password",
            type: "String",
            required: true,
            requiredMessage: "Password is required",
            validators: [],
            _id: 90261938962584,
            _createdBy: "70321997766166.type"
          },
          {
            name: "salt",
            type: "String",
            _id: 89316932932,
            _createdBy: "70321997766166.type"
          },
          {
            name: "password",
            type: "Virtual",
            virtual: {
              type: "custom",
              get: {
                template: "accountVirtualPasswordGet",
                _id: 16054782579514
              },
              set: {
                template: "accountVirtualPasswordSet",
                _id: 89958249603036
              },
              _id: 13699673849400
            },
            _id: 79916553871956,
            _createdBy: "70321997766166.type"
          },
          {
            name: "email",
            trim: true,
            type: "String",
            unique: true,
            uniqueMessage: "Email already exists",
            match: "/.+@.+..+/",
            required: true,
            requiredMessage: "Email is required",
            _id: 97462370564283,
            _createdBy: "70321997766166.type",
            minlength: 4,
            maxlength: 15
          }
        ],
        queries: [
          {
            name:
              "get_{70321997766166.plural}_by_{38002057164750.name}WithValue",
            type: "find",
            arguments: [
              {name: "{38002057164750.name}", _id: 3749810092884}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "38002057164750.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "3749810092884.name",
                        _id: 64567294917100
                      }
                    ],
                    _id: 78723071917046
                  }
                ],
                _id: 15822845277459
              }
            ],
            _id: 34331753671883,
            _createdBy: "38002057164750.type",
            populate: [{path: "undefined.name", selections: [{}]}],
            select: [
              {name: "94797397582874.name"},
              {name: "38825811427866.name"}
            ]
          },
          {
            name: "whoami",
            type: "custom",
            arguments: [{name: "id", _id: 89020527336583}],
            _id: 88282078318076,
            _createdBy: "70321997766166.type"
          }
        ],
        mutations: [
          {
            name: "set_{38002057164750.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 14637410726758},
              {name: "new_{38002057164750.name}", _id: 82619815649047}
            ],
            updates: [
              {
                field: "38002057164750.name",
                type: "set",
                fieldType: "Number",
                value: "82619815649047.name",
                _id: 24666890961216
              }
            ],
            _id: 50749229506997,
            _createdBy: "38002057164750.type"
          },
          {
            name: "unset_{38002057164750.name}",
            type: "findByIdAndUpdate",
            arguments: [{name: "id", _id: 64445678309959}],
            updates: [
              {
                field: "38002057164750.name",
                type: "unset",
                fieldType: "Number",
                _id: 43629634524481
              }
            ],
            _id: 78250660233269,
            _createdBy: "38002057164750.type"
          },
          {
            name: "increase_{38002057164750.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 90494416782408},
              {name: "increaseBy", defaultValue: 1, _id: 88596063095314}
            ],
            updates: [
              {
                field: "38002057164750.name",
                type: "inc",
                fieldType: "Number",
                value: "88596063095314.name",
                _id: 69272025869967
              }
            ],
            _id: 41739101780744,
            _createdBy: "38002057164750.type"
          },
          {
            name: "decrease_{38002057164750.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 26140602070589},
              {name: "decreaseBy", defaultValue: 1, _id: 28753427892269}
            ],
            updates: [
              {
                field: "38002057164750.name",
                type: "dec",
                fieldType: "Number",
                value: "28753427892269.name",
                _id: 83075033121771
              }
            ],
            _id: 31752824914642,
            _createdBy: "38002057164750.type"
          },
          {
            name: "{70321997766166.name}SignIn",
            type: "custom",
            arguments: [{name: "id", _id: 48788222610923}],
            template: {template: "accountSignIn", _id: 62503766891025},
            _id: 13174308853398,
            _createdBy: "70321997766166.type"
          },
          {
            name: "{70321997766166.name}SignOut",
            type: "custom",
            arguments: [{name: "id", _id: 71789902191554}],
            template: {template: "accountSignOut", _id: 27059014106190},
            _id: 42847820433871,
            _createdBy: "70321997766166.type"
          },
          {
            name: "{70321997766166.name}SignUp",
            type: "create",
            arguments: [],
            _id: 80452659701463,
            _createdBy: "70321997766166.type"
          },
          {
            name: "delete{70321997766166.name}Account",
            type: "delete",
            arguments: [],
            _id: 54764831276221,
            _createdBy: "70321997766166.type"
          }
        ],
        methods: [
          {
            name: "authenticate",
            function: {
              template: "accountMethodAuthenticate",
              _id: 50408136462425
            },
            _id: 98027297631200,
            _createdBy: "70321997766166.type"
          },
          {
            name: "makeSalt",
            function: {
              template: "accountMethodMakeSalt",
              _id: 62338041492805
            },
            _id: 94171184810039,
            _createdBy: "70321997766166.type"
          },
          {
            name: "encryptPassword",
            function: {
              template: "accountMethodEncryptPassword",
              _id: 75689938807270
            },
            _id: 11426633026239,
            _createdBy: "70321997766166.type"
          }
        ],
        _id: "70321997766166",
        routes: [
          {
            name: "login",
            type: "POST",
            endpoint: "{70321997766166.name}/login",
            arguments: [
              {name: "email", _id: 6414856217024},
              {name: "password", _id: 94543172930770}
            ],
            _id: 78354927396759,
            _createdBy: "70321997766166.type"
          },
          {
            name: "logout",
            type: "POST",
            endpoint: "{70321997766166.name}/logout",
            arguments: [],
            _id: 14890167324802,
            _createdBy: "70321997766166.type"
          },
          {
            name: "signup",
            type: "POST",
            endpoint: "{70321997766166.name}/signup",
            arguments: [
              {name: "email", _id: 54663263808781},
              {name: "password", _id: 7052730015422}
            ],
            _id: 27416915549499,
            _createdBy: "70321997766166.type"
          }
        ],
        pages: [
          {
            _id: "79452721213778",
            components: [
              {
                path: [0],
                children: null,
                expanded: true,
                name: "asdasdasd"
              },
              {path: [0, 0], children: null, expanded: true, name: "asdsa"},
              {
                path: [0, 0, 0],
                children: null,
                expanded: true,
                type: "list"
              },
              {path: [0, 0, 1], children: null, expanded: true},
              {path: [4], children: null, expanded: true},
              {path: [5], children: null},
              {path: ["0", "0,0", null, 0]}
            ],
            layout: {grid: []},
            type: "public",
            name: "assaas"
          },
          {
            layout: {
              grid: [
                {
                  w: 6,
                  h: 1,
                  x: 3,
                  y: 0,
                  i: "new-0",
                  moved: false,
                  static: false
                },
                {
                  w: 3,
                  h: 1,
                  x: 9,
                  y: 0,
                  i: "new-1",
                  moved: false,
                  static: false
                },
                {
                  w: 3,
                  h: 1,
                  x: 0,
                  y: 0,
                  i: "new-2",
                  moved: false,
                  static: false
                },
                {
                  w: 8,
                  h: 5,
                  x: 2,
                  y: 6,
                  i: "new-3",
                  moved: false,
                  static: false
                },
                {
                  w: 8,
                  h: 4,
                  x: 2,
                  y: 2,
                  i: "new-4",
                  moved: false,
                  static: false
                },
                {
                  w: 10,
                  h: 1,
                  x: 1,
                  y: 1,
                  i: "new-5",
                  moved: false,
                  static: false
                }
              ],
              sizeX: "600",
              sizeY: "600"
            },
            components: [
              {path: [0], expanded: true, children: null, props: [{}]},
              {
                path: ["0", 0],
                children: null,
                expanded: true,
                name: "fgfggfg",
                type: "conditional"
              },
              {path: [1], children: null, props: [{}], expanded: true},
              {path: [3], children: null},
              {path: ["0", null, 0]},
              {path: ["0", null, 0]}
            ],
            name: "dfdfdf",
            type: "private"
          }
        ],
        components: [
          {
            _id: "79858145378714",
            children: [{_id: "87908809625578"}],
            type: "conditional",
            props: [{_id: "44424746750874"}],
            name: "Login"
          }
        ]
      },
      {
        name: "Book",
        plural: "Books",
        type: "Data",
        properties: [
          {
            name: "title",
            type: "String",
            template: "String",
            _id: "98811030338675",
            required: true,
            validators: [],
            match: "dfdfdffsdss",
            requiredMessage: "asasasas",
            minlength: 3,
            maxlength: 20
          },
          {
            name: "61489883918264.manyToManyReverseFieldName",
            type: "Virtual",
            virtual: {
              name: "61489883918264.manyToManyReverseFieldName",
              type: "manyToMany",
              ref: "70321997766166.name",
              localField: "61489883918264.manyToManyReverseFieldName",
              foreignField: "61489883918264.name",
              _id: 96504265896807
            },
            _id: 52600760301794,
            _createdBy: "61489883918264.manyToManyReverseFieldName",
            template: "Virtual"
          },
          {
            name: "isbn",
            required: true,
            default: "11111",
            type: "Number",
            _id: "28733379178189",
            template: "Number",
            min: 1111,
            max: 999999
          },
          {
            name: "readCount",
            type: "Number",
            _id: "47716334165745",
            template: "Number",
            min: 0,
            unique: true
          }
        ],
        queries: [
          {
            name: "{34286625690291.name}ById",
            type: "findById",
            arguments: [{name: "id", _id: 37190550549985}],
            _id: 70370154527468,
            _createdBy: "34286625690291.type"
          },
          {
            name: "all{34286625690291.plural}",
            type: "find",
            arguments: [],
            _id: 98277283484560,
            _createdBy: "34286625690291.type",
            populate: [{}]
          },
          {
            name: "get_{34286625690291.plural}_by_{98811030338675.name}",
            type: "find",
            arguments: [
              {name: "{98811030338675.name}", _id: 94360389311607}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "{98811030338675.name}",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "94360389311607.name",
                        _id: 43236491645875
                      }
                    ],
                    _id: 94924143850054
                  }
                ],
                _id: 31930921293183
              }
            ],
            _id: 44243236829962,
            _createdBy: "98811030338675.type"
          },
          {
            name:
              "get_{34286625690291.plural}_by_{28733379178189.name}WithValue",
            type: "find",
            arguments: [
              {name: "{28733379178189.name}", _id: 79918079967875}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "28733379178189.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "79918079967875.name",
                        _id: 82673432731720
                      }
                    ],
                    _id: 18548323869773
                  }
                ],
                _id: 80456652330229
              }
            ],
            _id: 17935789985563,
            _createdBy: "28733379178189.type"
          },
          {
            name:
              "get_{34286625690291.plural}_by_{47716334165745.name}WithValue",
            type: "find",
            arguments: [
              {name: "{47716334165745.name}", _id: 68657186440961}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "47716334165745.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "68657186440961.name",
                        _id: 27999757675217
                      }
                    ],
                    _id: 55621945945467
                  }
                ],
                _id: 12609601038974
              }
            ],
            _id: 56212231727858,
            _createdBy: "47716334165745.type"
          }
        ],
        mutations: [
          {
            name: "remove{34286625690291.name}ById",
            type: "findByIdAndDelete",
            arguments: [{name: "id", _id: 35090449730513}],
            _id: 90519884373040,
            _createdBy: "34286625690291.type"
          },
          {
            name: "create{34286625690291.name}",
            type: "create",
            arguments: [],
            _id: 71236765766315,
            _createdBy: "34286625690291.type"
          },
          {
            name: "set_{28733379178189.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 41686984273257},
              {name: "new_{28733379178189.name}", _id: 78587814052117}
            ],
            updates: [
              {
                field: "28733379178189.name",
                type: "set",
                fieldType: "Number",
                value: "78587814052117.name",
                _id: 2761753114660
              }
            ],
            _id: 4515873981463,
            _createdBy: "28733379178189.type"
          },
          {
            name: "unset_{28733379178189.name}",
            type: "findByIdAndUpdate",
            arguments: [{name: "id", _id: 72151601121667}],
            updates: [
              {
                field: "28733379178189.name",
                type: "unset",
                fieldType: "Number",
                _id: 98296773778894
              }
            ],
            _id: 26756591082433,
            _createdBy: "28733379178189.type"
          },
          {
            name: "increase_{28733379178189.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 69424766368917},
              {name: "increaseBy", defaultValue: 1, _id: 18012146130942}
            ],
            updates: [
              {
                field: "28733379178189.name",
                type: "inc",
                fieldType: "Number",
                value: "18012146130942.name",
                _id: 3844888063350
              }
            ],
            _id: 79477888735712,
            _createdBy: "28733379178189.type"
          },
          {
            name: "decrease_{28733379178189.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 93433921481574},
              {name: "decreaseBy", defaultValue: 1, _id: 21131126131380}
            ],
            updates: [
              {
                field: "28733379178189.name",
                type: "dec",
                fieldType: "Number",
                value: "21131126131380.name",
                _id: 97874798050897
              }
            ],
            _id: 56017788158438,
            _createdBy: "28733379178189.type"
          },
          {
            name: "set_{47716334165745.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 51687254933944},
              {name: "new_{47716334165745.name}", _id: 44470310478187}
            ],
            updates: [
              {
                field: "47716334165745.name",
                type: "set",
                fieldType: "Number",
                value: "44470310478187.name",
                _id: 23285851538313
              }
            ],
            _id: 93826356250044,
            _createdBy: "47716334165745.type"
          },
          {
            name: "unset_{47716334165745.name}",
            type: "findByIdAndUpdate",
            arguments: [{name: "id", _id: 14102092380904}],
            updates: [
              {
                field: "47716334165745.name",
                type: "unset",
                fieldType: "Number",
                _id: 85938082285260
              }
            ],
            _id: 12650315936146,
            _createdBy: "47716334165745.type"
          },
          {
            name: "increase_{47716334165745.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 89282277952646},
              {name: "increaseBy", defaultValue: 1, _id: 2043361525840}
            ],
            updates: [
              {
                field: "47716334165745.name",
                type: "inc",
                fieldType: "Number",
                value: "2043361525840.name",
                _id: 78996994139768
              }
            ],
            _id: 46497232423555,
            _createdBy: "47716334165745.type"
          },
          {
            name: "decrease_{47716334165745.name}",
            type: "findByIdAndUpdate",
            arguments: [
              {name: "id", _id: 24363528976746},
              {name: "decreaseBy", defaultValue: 1, _id: 72700768755723}
            ],
            updates: [
              {
                field: "47716334165745.name",
                type: "dec",
                fieldType: "Number",
                value: "72700768755723.name",
                _id: 46529387839644
              }
            ],
            _id: 1849446247104,
            _createdBy: "47716334165745.type"
          }
        ],
        routes: [
          {
            name: "remove{34286625690291.name}",
            endpoint: "{34286625690291.name}/$id",
            type: "DELETE",
            arguments: [{name: "id", _id: 9427029857494}],
            _id: 22975812356208,
            _createdBy: "34286625690291.type"
          }
        ],
        _id: "34286625690291",
        methods: []
      },
      {
        name: "Publisher",
        plural: "Publishers",
        type: "Account",
        properties: [
          {
            name: "companyName",
            required: true,
            type: "String",
            template: "String",
            unique: true,
            _id: "27302500136108",
            requiredMessage: "A company name is required",
            match: "/[A-Za-z ]*/",
            lowercase: false,
            trim: true,
            index: true,
            alias: "name",
            default: "Untitled Publisher",
            minlength: 2,
            maxlength: 30
          },
          {
            name: "59909358254229.manyToManyReverseFieldName",
            type: "Virtual",
            virtual: {
              name: "59909358254229.manyToManyReverseFieldName",
              type: "ManyToMany",
              ref: "70321997766166.name",
              localField: "59909358254229.manyToManyReverseFieldName",
              foreignField: "59909358254229.name",
              _id: 75740487881248
            },
            _id: 63929069453846,
            _createdBy: "59909358254229.manyToManyReverseFieldName",
            template: "Virtual"
          },
          {
            name: "hashed_password",
            type: "String",
            required: true,
            requiredMessage: "Password is required",
            validators: [
              {
                name: "checkPassword",
                function: {
                  template: "accountValidationHashedPassword",
                  _id: 69440801404933
                },
                _id: 46406435066590
              }
            ],
            _id: 34470078665190,
            _createdBy: "20825084921224.type"
          },
          {
            name: "salt",
            type: "String",
            _id: 90735258872236,
            _createdBy: "20825084921224.type"
          },
          {
            name: "password",
            type: "Virtual",
            virtual: {
              type: "custom",
              get: {
                template: "accountVirtualPasswordGet",
                _id: 74033049597261
              },
              set: {
                template: "accountVirtualPasswordSet",
                _id: 72612932538252
              },
              _id: 25369561089941
            },
            _id: 68462383319154,
            _createdBy: "20825084921224.type"
          },
          {
            name: "email",
            trim: true,
            type: "String",
            unique: true,
            uniqueMessage: "Email already exists",
            match: "/.+@.+..+/",
            required: true,
            requiredMessage: "Email is required",
            _id: 94779169130137,
            _createdBy: "20825084921224.type"
          }
        ],
        queries: [
          {
            name: "get_{20825084921224.plural}_by_{27302500136108.name}",
            type: "find",
            arguments: [
              {name: "{27302500136108.name}", _id: 44901979244985}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "27302500136108.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "44901979244985.name",
                        _id: 82795488928685
                      }
                    ],
                    _id: 84359152754779
                  }
                ],
                _id: 2354991496337
              }
            ],
            _id: 45993069851034,
            _createdBy: "27302500136108.type"
          },
          {
            name: "whoami",
            type: "custom",
            arguments: [{name: "id", _id: 92210990726143}],
            _id: 6971889706117,
            _createdBy: "20825084921224.type"
          }
        ],
        mutations: [
          {
            name: "{20825084921224.name}SignIn",
            type: "custom",
            arguments: [{name: "id", _id: 45899200517932}],
            template: {template: "accountSignIn", _id: 36978276960563},
            _id: 59424869993868,
            _createdBy: "20825084921224.type"
          },
          {
            name: "{20825084921224.name}SignOut",
            type: "custom",
            arguments: [{name: "id", _id: 98760928127618}],
            template: {template: "accountSignOut", _id: 50718924466166},
            _id: 73582119841790,
            _createdBy: "20825084921224.type"
          },
          {
            name: "{20825084921224.name}SignUp",
            type: "create",
            arguments: [],
            _id: 93918890385657,
            _createdBy: "20825084921224.type"
          },
          {
            name: "delete{20825084921224.name}Account",
            type: "delete",
            arguments: [],
            _id: 87468036186098,
            _createdBy: "20825084921224.type"
          }
        ],
        methods: [
          {
            name: "authenticate",
            function: {
              template: "accountMethodAuthenticate",
              _id: 74578877994105
            },
            _id: 84689366412146,
            _createdBy: "20825084921224.type"
          },
          {
            name: "makeSalt",
            function: {
              template: "accountMethodMakeSalt",
              _id: 81327814186069
            },
            _id: 90706092775338,
            _createdBy: "20825084921224.type"
          },
          {
            name: "encryptPassword",
            function: {
              template: "accountMethodEncryptPassword",
              _id: 75925186964217
            },
            _id: 36196820655860,
            _createdBy: "20825084921224.type"
          }
        ],
        routes: [
          {
            name: "login",
            type: "POST",
            endpoint: "{20825084921224.name}/login",
            arguments: [
              {name: "email", _id: 51488928430339},
              {name: "password", _id: 43031926276168}
            ],
            _id: 44467054687265,
            _createdBy: "20825084921224.type"
          },
          {
            name: "logout",
            type: "POST",
            endpoint: "{20825084921224.name}/logout",
            arguments: [],
            _id: 47132451334323,
            _createdBy: "20825084921224.type"
          },
          {
            name: "signup",
            type: "POST",
            endpoint: "{20825084921224.name}/signup",
            arguments: [
              {name: "email", _id: 9733478481346},
              {name: "password", _id: 46226481545233}
            ],
            _id: 22861923837466,
            _createdBy: "20825084921224.type"
          }
        ],
        _id: "20825084921224"
      },
      {
        name: "Comic",
        plural: "Comics",
        type: "Data",
        queries: [
          {
            name: "{63134275919902.name}ById",
            type: "findById",
            arguments: [{name: "id", _id: 34587527347670}],
            _id: 74784035380828,
            _createdBy: "63134275919902.type"
          },
          {
            name: "all{63134275919902.plural}",
            type: "find",
            arguments: [],
            _id: 53791599641692,
            _createdBy: "63134275919902.type"
          }
        ],
        mutations: [
          {
            name: "remove{63134275919902.name}ById",
            type: "findByIdAndDelete",
            arguments: [{name: "id", _id: 57730664250274}],
            _id: 1890275902624,
            _createdBy: "63134275919902.type"
          },
          {
            name: "create{63134275919902.name}",
            type: "create",
            arguments: [],
            _id: 90283053368918,
            _createdBy: "63134275919902.type"
          }
        ],
        routes: [
          {
            name: "remove{63134275919902.name}",
            endpoint: "{63134275919902.name}/$id",
            type: "DELETE",
            arguments: [{name: "id", _id: 30285979531613}],
            _id: 1918666820876,
            _createdBy: "63134275919902.type"
          },
          {
            name: "create{63134275919902.name}",
            endpoint: "{63134275919902.name}",
            type: "POST",
            arguments: [{name: "id", _id: 29947426463393}],
            _id: 21652291549902,
            _createdBy: "63134275919902.type"
          },
          {
            name: "update{63134275919902.name}",
            endpoint: "{63134275919902.name}/$id",
            type: "PUT",
            arguments: [{name: "id", _id: 27383979829176}],
            _id: 70191452300927,
            _createdBy: "63134275919902.type"
          }
        ],
        _id: "63134275919902"
      },
      {
        name: "Review",
        plural: "Reviews",
        type: "Data",
        properties: [
          {
            name: "title",
            type: "String",
            _id: "15990967430790",
            template: "String"
          },
          {
            name: "content",
            type: "String",
            _id: "96658280739592",
            template: "String"
          },
          {
            name: "book",
            type: "OneToOne",
            _id: "20543265384283",
            oneToOneRelation: "34286625690291.name"
          }
        ],
        queries: [
          {
            name: "{59154778900496.name}ById",
            type: "findById",
            arguments: [{name: "id", _id: 7023009448157}],
            _id: 37129364238582,
            _createdBy: "59154778900496.type"
          },
          {
            name: "all{59154778900496.plural}",
            type: "find",
            arguments: [],
            _id: 76066929674674,
            _createdBy: "59154778900496.type"
          },
          {
            name: "get_{59154778900496.plural}_by_{15990967430790.name}",
            type: "find",
            arguments: [
              {name: "{15990967430790.name}", _id: 94518635890494}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "15990967430790.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "94518635890494.name",
                        _id: 3549071779522
                      }
                    ],
                    _id: 40462771104085
                  }
                ],
                _id: 83836181895774
              }
            ],
            _id: 55555492476731,
            _createdBy: "15990967430790.type"
          },
          {
            name: "get_{59154778900496.plural}_by_{96658280739592.name}",
            type: "find",
            arguments: [
              {name: "{96658280739592.name}", _id: 51212253071201}
            ],
            conditions: [
              {
                type: "normal",
                expressions: [
                  {
                    field: "96658280739592.name",
                    subexpressions: [
                      {
                        operator: "equals",
                        value: "51212253071201.name",
                        _id: 42809130697690
                      }
                    ],
                    _id: 8870968552980
                  }
                ],
                _id: 32311417480989
              }
            ],
            _id: 96671370969051,
            _createdBy: "96658280739592.type"
          }
        ],
        mutations: [
          {
            name: "remove{59154778900496.name}ById",
            type: "findByIdAndDelete",
            arguments: [{name: "id", _id: 97636905810733}],
            _id: 44523485132072,
            _createdBy: "59154778900496.type"
          },
          {
            name: "create{59154778900496.name}",
            type: "create",
            arguments: [],
            _id: 88172655258889,
            _createdBy: "59154778900496.type"
          }
        ],
        routes: [
          {
            name: "remove{59154778900496.name}",
            endpoint: "{59154778900496.name}/$id",
            type: "DELETE",
            arguments: [{name: "id", _id: 92054821633118}],
            _id: 17123355884993,
            _createdBy: "59154778900496.type"
          },
          {
            name: "create{59154778900496.name}",
            endpoint: "{59154778900496.name}",
            type: "POST",
            arguments: [{name: "id", _id: 84324071641791}],
            _id: 92825724830412,
            _createdBy: "59154778900496.type"
          },
          {
            name: "update{59154778900496.name}",
            endpoint: "{59154778900496.name}/$id",
            type: "PUT",
            arguments: [{name: "id", _id: 87753933754020}],
            _id: 71339244249274,
            _createdBy: "59154778900496.type"
          }
        ],
        _id: "59154778900496"
      },
      {
        name: "Reviewer",
        plural: "Reviewer",
        type: "Account",
        properties: [
          {
            name: "hashed_password",
            type: "String",
            required: true,
            requiredMessage: "Password is required",
            validators: [
              {
                name: "checkPassword",
                function: {
                  template: "accountValidationHashedPassword",
                  _id: 82402540060769
                },
                _id: 97614418955323
              }
            ],
            _id: 22755194596040,
            _createdBy: "31731143103197.type"
          },
          {
            name: "salt",
            type: "String",
            _id: 38184324411792,
            _createdBy: "31731143103197.type"
          },
          {
            name: "password",
            type: "Virtual",
            virtual: {
              type: "custom",
              get: {
                template: "accountVirtualPasswordGet",
                _id: 4382560165098
              },
              set: {
                template: "accountVirtualPasswordSet",
                _id: 77562345768130
              },
              _id: 91343887153354
            },
            _id: 15636653974948,
            _createdBy: "31731143103197.type"
          },
          {
            name: "email",
            trim: true,
            type: "String",
            unique: true,
            uniqueMessage: "Email already exists",
            match: "/.+@.+..+/",
            required: true,
            requiredMessage: "Email is required",
            _id: 96966304888489,
            _createdBy: "31731143103197.type"
          }
        ],
        queries: [
          {
            name: "whoami",
            type: "custom",
            arguments: [{name: "id", _id: 54042279615854}],
            _id: 48278784489882,
            _createdBy: "31731143103197.type"
          }
        ],
        mutations: [
          {
            name: "{31731143103197.name}SignIn",
            type: "custom",
            arguments: [{name: "id", _id: 95566163456222}],
            template: {template: "accountSignIn", _id: 34434651085205},
            _id: 10399841299116,
            _createdBy: "31731143103197.type"
          },
          {
            name: "{31731143103197.name}SignOut",
            type: "custom",
            arguments: [{name: "id", _id: 47156537030606}],
            template: {template: "accountSignOut", _id: 70540569955564},
            _id: 16085332896332,
            _createdBy: "31731143103197.type"
          },
          {
            name: "{31731143103197.name}SignUp",
            type: "create",
            arguments: [],
            _id: 23973786153310,
            _createdBy: "31731143103197.type"
          },
          {
            name: "delete{31731143103197.name}Account",
            type: "delete",
            arguments: [],
            _id: 90576630000221,
            _createdBy: "31731143103197.type"
          }
        ],
        methods: [
          {
            name: "authenticate",
            function: {
              template: "accountMethodAuthenticate",
              _id: 33259041370122
            },
            _id: 15678643556830,
            _createdBy: "31731143103197.type"
          },
          {
            name: "makeSalt",
            function: {
              template: "accountMethodMakeSalt",
              _id: 23604578026860
            },
            _id: 92199534969472,
            _createdBy: "31731143103197.type"
          },
          {
            name: "encryptPassword",
            function: {
              template: "accountMethodEncryptPassword",
              _id: 21294654401004
            },
            _id: 12411723270782,
            _createdBy: "31731143103197.type"
          }
        ],
        routes: [
          {
            name: "login",
            type: "POST",
            endpoint: "{31731143103197.name}/login",
            arguments: [
              {name: "email", _id: 48404052401503},
              {name: "password", _id: 21766381523750}
            ],
            _id: 15492573550957,
            _createdBy: "31731143103197.type"
          },
          {
            name: "logout",
            type: "POST",
            endpoint: "{31731143103197.name}/logout",
            arguments: [],
            _id: 72280382614423,
            _createdBy: "31731143103197.type"
          },
          {
            name: "signup",
            type: "POST",
            endpoint: "{31731143103197.name}/signup",
            arguments: [
              {name: "email", _id: 55381857310768},
              {name: "password", _id: 4710583235200}
            ],
            _id: 86516658393283,
            _createdBy: "31731143103197.type"
          }
        ],
        _id: "31731143103197"
      }
    ],
    _id: "79531064802223"
  },
  _id: "87070355489752",
  _flat: {
    "70321997766166": {
      name: "Author",
      plural: "Authors",
      type: "Account",
      properties: [
        {
          name: "favBooks",
          type: "ManyToMany",
          _id: "61489883918264",
          oneToOneRelation: "34286625690291.name",
          manyToManyRelation: "34286625690291.name",
          manyToManyReverseFieldName: "favouritedBy",
          validators: [],
          relation: "34286625690291.name"
        },
        {
          name: "age",
          type: "Number",
          template: "Number",
          _id: "38002057164750",
          validators: [],
          required: true,
          requiredMessage: "Age is required"
        },
        {
          name: "isFictional",
          type: "Boolean",
          _id: "38825811427866",
          trueStrings: [
            {value: "group of people", _id: "49729204224279"},
            {value: "anonymous", _id: "51245831609104"}
          ],
          template: "Boolean",
          falseStrings: [],
          required: true,
          unique: true,
          default: "false"
        },
        {
          _id: "59909358254229",
          name: "publishers",
          type: "ManyToMany",
          oneToManyRelation: "20825084921224.name",
          template: "String",
          manyToManyRelation: "20825084921224.name",
          manyToManyReverseFieldName: "authors",
          relation: "20825084921224.name"
        },
        {
          name: "favBook",
          type: "OneToOne",
          oneToOneRelation: "34286625690291.name",
          relation: "34286625690291.name"
        },
        {
          name: "hashed_password",
          type: "String",
          required: true,
          requiredMessage: "Password is required",
          validators: [],
          _id: 90261938962584,
          _createdBy: "70321997766166.type"
        },
        {
          name: "salt",
          type: "String",
          _id: 89316932932,
          _createdBy: "70321997766166.type"
        },
        {
          name: "password",
          type: "Virtual",
          virtual: {
            type: "custom",
            get: {
              template: "accountVirtualPasswordGet",
              _id: 16054782579514
            },
            set: {
              template: "accountVirtualPasswordSet",
              _id: 89958249603036
            },
            _id: 13699673849400
          },
          _id: 79916553871956,
          _createdBy: "70321997766166.type"
        },
        {
          name: "email",
          trim: true,
          type: "String",
          unique: true,
          uniqueMessage: "Email already exists",
          match: "/.+@.+..+/",
          required: true,
          requiredMessage: "Email is required",
          _id: 97462370564283,
          _createdBy: "70321997766166.type",
          minlength: 4,
          maxlength: 15
        }
      ],
      queries: [
        {
          name:
            "get_{70321997766166.plural}_by_{38002057164750.name}WithValue",
          type: "find",
          arguments: [{name: "{38002057164750.name}", _id: 3749810092884}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "38002057164750.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "3749810092884.name",
                      _id: 64567294917100
                    }
                  ],
                  _id: 78723071917046
                }
              ],
              _id: 15822845277459
            }
          ],
          _id: 34331753671883,
          _createdBy: "38002057164750.type",
          populate: [{path: "undefined.name", selections: [{}]}],
          select: [
            {name: "94797397582874.name"},
            {name: "38825811427866.name"}
          ]
        },
        {
          name: "whoami",
          type: "custom",
          arguments: [{name: "id", _id: 89020527336583}],
          _id: 88282078318076,
          _createdBy: "70321997766166.type"
        }
      ],
      mutations: [
        {
          name: "set_{38002057164750.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 14637410726758},
            {name: "new_{38002057164750.name}", _id: 82619815649047}
          ],
          updates: [
            {
              field: "38002057164750.name",
              type: "set",
              fieldType: "Number",
              value: "82619815649047.name",
              _id: 24666890961216
            }
          ],
          _id: 50749229506997,
          _createdBy: "38002057164750.type"
        },
        {
          name: "unset_{38002057164750.name}",
          type: "findByIdAndUpdate",
          arguments: [{name: "id", _id: 64445678309959}],
          updates: [
            {
              field: "38002057164750.name",
              type: "unset",
              fieldType: "Number",
              _id: 43629634524481
            }
          ],
          _id: 78250660233269,
          _createdBy: "38002057164750.type"
        },
        {
          name: "increase_{38002057164750.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 90494416782408},
            {name: "increaseBy", defaultValue: 1, _id: 88596063095314}
          ],
          updates: [
            {
              field: "38002057164750.name",
              type: "inc",
              fieldType: "Number",
              value: "88596063095314.name",
              _id: 69272025869967
            }
          ],
          _id: 41739101780744,
          _createdBy: "38002057164750.type"
        },
        {
          name: "decrease_{38002057164750.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 26140602070589},
            {name: "decreaseBy", defaultValue: 1, _id: 28753427892269}
          ],
          updates: [
            {
              field: "38002057164750.name",
              type: "dec",
              fieldType: "Number",
              value: "28753427892269.name",
              _id: 83075033121771
            }
          ],
          _id: 31752824914642,
          _createdBy: "38002057164750.type"
        },
        {
          name: "{70321997766166.name}SignIn",
          type: "custom",
          arguments: [{name: "id", _id: 48788222610923}],
          template: {template: "accountSignIn", _id: 62503766891025},
          _id: 13174308853398,
          _createdBy: "70321997766166.type"
        },
        {
          name: "{70321997766166.name}SignOut",
          type: "custom",
          arguments: [{name: "id", _id: 71789902191554}],
          template: {template: "accountSignOut", _id: 27059014106190},
          _id: 42847820433871,
          _createdBy: "70321997766166.type"
        },
        {
          name: "{70321997766166.name}SignUp",
          type: "create",
          arguments: [],
          _id: 80452659701463,
          _createdBy: "70321997766166.type"
        },
        {
          name: "delete{70321997766166.name}Account",
          type: "delete",
          arguments: [],
          _id: 54764831276221,
          _createdBy: "70321997766166.type"
        }
      ],
      methods: [
        {
          name: "authenticate",
          function: {
            template: "accountMethodAuthenticate",
            _id: 50408136462425
          },
          _id: 98027297631200,
          _createdBy: "70321997766166.type"
        },
        {
          name: "makeSalt",
          function: {
            template: "accountMethodMakeSalt",
            _id: 62338041492805
          },
          _id: 94171184810039,
          _createdBy: "70321997766166.type"
        },
        {
          name: "encryptPassword",
          function: {
            template: "accountMethodEncryptPassword",
            _id: 75689938807270
          },
          _id: 11426633026239,
          _createdBy: "70321997766166.type"
        }
      ],
      _id: "70321997766166",
      routes: [
        {
          name: "login",
          type: "POST",
          endpoint: "{70321997766166.name}/login",
          arguments: [
            {name: "email", _id: 6414856217024},
            {name: "password", _id: 94543172930770}
          ],
          _id: 78354927396759,
          _createdBy: "70321997766166.type"
        },
        {
          name: "logout",
          type: "POST",
          endpoint: "{70321997766166.name}/logout",
          arguments: [],
          _id: 14890167324802,
          _createdBy: "70321997766166.type"
        },
        {
          name: "signup",
          type: "POST",
          endpoint: "{70321997766166.name}/signup",
          arguments: [
            {name: "email", _id: 54663263808781},
            {name: "password", _id: 7052730015422}
          ],
          _id: 27416915549499,
          _createdBy: "70321997766166.type"
        }
      ],
      pages: [
        {
          _id: "79452721213778",
          components: [
            {path: [0], children: null, expanded: true, name: "asdasdasd"},
            {path: [0, 0], children: null, expanded: true, name: "asdsa"},
            {path: [0, 0, 0], children: null, expanded: true, type: "list"},
            {path: [0, 0, 1], children: null, expanded: true},
            {path: [4], children: null, expanded: true},
            {path: [5], children: null},
            {path: ["0", "0,0", null, 0]}
          ],
          layout: {grid: []},
          type: "public",
          name: "assaas"
        },
        {
          layout: {
            grid: [
              {
                w: 6,
                h: 1,
                x: 3,
                y: 0,
                i: "new-0",
                moved: false,
                static: false
              },
              {
                w: 3,
                h: 1,
                x: 9,
                y: 0,
                i: "new-1",
                moved: false,
                static: false
              },
              {
                w: 3,
                h: 1,
                x: 0,
                y: 0,
                i: "new-2",
                moved: false,
                static: false
              },
              {
                w: 8,
                h: 5,
                x: 2,
                y: 6,
                i: "new-3",
                moved: false,
                static: false
              },
              {
                w: 8,
                h: 4,
                x: 2,
                y: 2,
                i: "new-4",
                moved: false,
                static: false
              },
              {
                w: 10,
                h: 1,
                x: 1,
                y: 1,
                i: "new-5",
                moved: false,
                static: false
              }
            ],
            sizeX: "600",
            sizeY: "600"
          },
          components: [
            {path: [0], expanded: true, children: null, props: [{}]},
            {
              path: ["0", 0],
              children: null,
              expanded: true,
              name: "fgfggfg",
              type: "conditional"
            },
            {path: [1], children: null, props: [{}], expanded: true},
            {path: [3], children: null},
            {path: ["0", null, 0]},
            {path: ["0", null, 0]}
          ],
          name: "dfdfdf",
          type: "private"
        }
      ],
      components: [
        {
          _id: "79858145378714",
          children: [{_id: "87908809625578"}],
          type: "conditional",
          props: [{_id: "44424746750874"}],
          name: "Login"
        }
      ]
    },
    "61489883918264": {
      name: "favBooks",
      type: "ManyToMany",
      _id: "61489883918264",
      oneToOneRelation: "34286625690291.name",
      manyToManyRelation: "34286625690291.name",
      manyToManyReverseFieldName: "favouritedBy",
      validators: [],
      relation: "34286625690291.name"
    },
    "38002057164750": {
      name: "age",
      type: "Number",
      template: "Number",
      _id: "38002057164750",
      validators: [],
      required: true,
      requiredMessage: "Age is required"
    },
    "38825811427866": {
      name: "isFictional",
      type: "Boolean",
      _id: "38825811427866",
      trueStrings: [
        {value: "group of people", _id: "49729204224279"},
        {value: "anonymous", _id: "51245831609104"}
      ],
      template: "Boolean",
      falseStrings: [],
      required: true,
      unique: true,
      default: "false"
    },
    "49729204224279": {value: "group of people", _id: "49729204224279"},
    "51245831609104": {value: "anonymous", _id: "51245831609104"},
    "59909358254229": {
      _id: "59909358254229",
      name: "publishers",
      type: "ManyToMany",
      oneToManyRelation: "20825084921224.name",
      template: "String",
      manyToManyRelation: "20825084921224.name",
      manyToManyReverseFieldName: "authors",
      relation: "20825084921224.name"
    },
    "90261938962584": {
      name: "hashed_password",
      type: "String",
      required: true,
      requiredMessage: "Password is required",
      validators: [],
      _id: 90261938962584,
      _createdBy: "70321997766166.type"
    },
    "89316932932": {
      name: "salt",
      type: "String",
      _id: 89316932932,
      _createdBy: "70321997766166.type"
    },
    "79916553871956": {
      name: "password",
      type: "Virtual",
      virtual: {
        type: "custom",
        get: {template: "accountVirtualPasswordGet", _id: 16054782579514},
        set: {template: "accountVirtualPasswordSet", _id: 89958249603036},
        _id: 13699673849400
      },
      _id: 79916553871956,
      _createdBy: "70321997766166.type"
    },
    "97462370564283": {
      name: "email",
      trim: true,
      type: "String",
      unique: true,
      uniqueMessage: "Email already exists",
      match: "/.+@.+..+/",
      required: true,
      requiredMessage: "Email is required",
      _id: 97462370564283,
      _createdBy: "70321997766166.type",
      minlength: 4,
      maxlength: 15
    },
    "34331753671883": {
      name: "get_{70321997766166.plural}_by_{38002057164750.name}WithValue",
      type: "find",
      arguments: [{name: "{38002057164750.name}", _id: 3749810092884}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "38002057164750.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "3749810092884.name",
                  _id: 64567294917100
                }
              ],
              _id: 78723071917046
            }
          ],
          _id: 15822845277459
        }
      ],
      _id: 34331753671883,
      _createdBy: "38002057164750.type",
      populate: [{path: "undefined.name", selections: [{}]}],
      select: [
        {name: "94797397582874.name"},
        {name: "38825811427866.name"}
      ]
    },
    "3749810092884": {name: "{38002057164750.name}", _id: 3749810092884},
    "15822845277459": {
      type: "normal",
      expressions: [
        {
          field: "38002057164750.name",
          subexpressions: [
            {
              operator: "equals",
              value: "3749810092884.name",
              _id: 64567294917100
            }
          ],
          _id: 78723071917046
        }
      ],
      _id: 15822845277459
    },
    "78723071917046": {
      field: "38002057164750.name",
      subexpressions: [
        {
          operator: "equals",
          value: "3749810092884.name",
          _id: 64567294917100
        }
      ],
      _id: 78723071917046
    },
    "64567294917100": {
      operator: "equals",
      value: "3749810092884.name",
      _id: 64567294917100
    },
    "88282078318076": {
      name: "whoami",
      type: "custom",
      arguments: [{name: "id", _id: 89020527336583}],
      _id: 88282078318076,
      _createdBy: "70321997766166.type"
    },
    "89020527336583": {name: "id", _id: 89020527336583},
    "50749229506997": {
      name: "set_{38002057164750.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 14637410726758},
        {name: "new_{38002057164750.name}", _id: 82619815649047}
      ],
      updates: [
        {
          field: "38002057164750.name",
          type: "set",
          fieldType: "Number",
          value: "82619815649047.name",
          _id: 24666890961216
        }
      ],
      _id: 50749229506997,
      _createdBy: "38002057164750.type"
    },
    "14637410726758": {name: "id", _id: 14637410726758},
    "82619815649047": {
      name: "new_{38002057164750.name}",
      _id: 82619815649047
    },
    "24666890961216": {
      field: "38002057164750.name",
      type: "set",
      fieldType: "Number",
      value: "82619815649047.name",
      _id: 24666890961216
    },
    "78250660233269": {
      name: "unset_{38002057164750.name}",
      type: "findByIdAndUpdate",
      arguments: [{name: "id", _id: 64445678309959}],
      updates: [
        {
          field: "38002057164750.name",
          type: "unset",
          fieldType: "Number",
          _id: 43629634524481
        }
      ],
      _id: 78250660233269,
      _createdBy: "38002057164750.type"
    },
    "64445678309959": {name: "id", _id: 64445678309959},
    "43629634524481": {
      field: "38002057164750.name",
      type: "unset",
      fieldType: "Number",
      _id: 43629634524481
    },
    "41739101780744": {
      name: "increase_{38002057164750.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 90494416782408},
        {name: "increaseBy", defaultValue: 1, _id: 88596063095314}
      ],
      updates: [
        {
          field: "38002057164750.name",
          type: "inc",
          fieldType: "Number",
          value: "88596063095314.name",
          _id: 69272025869967
        }
      ],
      _id: 41739101780744,
      _createdBy: "38002057164750.type"
    },
    "90494416782408": {name: "id", _id: 90494416782408},
    "88596063095314": {
      name: "increaseBy",
      defaultValue: 1,
      _id: 88596063095314
    },
    "69272025869967": {
      field: "38002057164750.name",
      type: "inc",
      fieldType: "Number",
      value: "88596063095314.name",
      _id: 69272025869967
    },
    "31752824914642": {
      name: "decrease_{38002057164750.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 26140602070589},
        {name: "decreaseBy", defaultValue: 1, _id: 28753427892269}
      ],
      updates: [
        {
          field: "38002057164750.name",
          type: "dec",
          fieldType: "Number",
          value: "28753427892269.name",
          _id: 83075033121771
        }
      ],
      _id: 31752824914642,
      _createdBy: "38002057164750.type"
    },
    "26140602070589": {name: "id", _id: 26140602070589},
    "28753427892269": {
      name: "decreaseBy",
      defaultValue: 1,
      _id: 28753427892269
    },
    "83075033121771": {
      field: "38002057164750.name",
      type: "dec",
      fieldType: "Number",
      value: "28753427892269.name",
      _id: 83075033121771
    },
    "13174308853398": {
      name: "{70321997766166.name}SignIn",
      type: "custom",
      arguments: [{name: "id", _id: 48788222610923}],
      template: {template: "accountSignIn", _id: 62503766891025},
      _id: 13174308853398,
      _createdBy: "70321997766166.type"
    },
    "48788222610923": {name: "id", _id: 48788222610923},
    "42847820433871": {
      name: "{70321997766166.name}SignOut",
      type: "custom",
      arguments: [{name: "id", _id: 71789902191554}],
      template: {template: "accountSignOut", _id: 27059014106190},
      _id: 42847820433871,
      _createdBy: "70321997766166.type"
    },
    "71789902191554": {name: "id", _id: 71789902191554},
    "80452659701463": {
      name: "{70321997766166.name}SignUp",
      type: "create",
      arguments: [],
      _id: 80452659701463,
      _createdBy: "70321997766166.type"
    },
    "54764831276221": {
      name: "delete{70321997766166.name}Account",
      type: "delete",
      arguments: [],
      _id: 54764831276221,
      _createdBy: "70321997766166.type"
    },
    "98027297631200": {
      name: "authenticate",
      function: {
        template: "accountMethodAuthenticate",
        _id: 50408136462425
      },
      _id: 98027297631200,
      _createdBy: "70321997766166.type"
    },
    "94171184810039": {
      name: "makeSalt",
      function: {template: "accountMethodMakeSalt", _id: 62338041492805},
      _id: 94171184810039,
      _createdBy: "70321997766166.type"
    },
    "11426633026239": {
      name: "encryptPassword",
      function: {
        template: "accountMethodEncryptPassword",
        _id: 75689938807270
      },
      _id: 11426633026239,
      _createdBy: "70321997766166.type"
    },
    "78354927396759": {
      name: "login",
      type: "POST",
      endpoint: "{70321997766166.name}/login",
      arguments: [
        {name: "email", _id: 6414856217024},
        {name: "password", _id: 94543172930770}
      ],
      _id: 78354927396759,
      _createdBy: "70321997766166.type"
    },
    "6414856217024": {name: "email", _id: 6414856217024},
    "94543172930770": {name: "password", _id: 94543172930770},
    "14890167324802": {
      name: "logout",
      type: "POST",
      endpoint: "{70321997766166.name}/logout",
      arguments: [],
      _id: 14890167324802,
      _createdBy: "70321997766166.type"
    },
    "27416915549499": {
      name: "signup",
      type: "POST",
      endpoint: "{70321997766166.name}/signup",
      arguments: [
        {name: "email", _id: 54663263808781},
        {name: "password", _id: 7052730015422}
      ],
      _id: 27416915549499,
      _createdBy: "70321997766166.type"
    },
    "54663263808781": {name: "email", _id: 54663263808781},
    "7052730015422": {name: "password", _id: 7052730015422},
    "79452721213778": {
      _id: "79452721213778",
      components: [
        {path: [0], children: null, expanded: true, name: "asdasdasd"},
        {path: [0, 0], children: null, expanded: true, name: "asdsa"},
        {path: [0, 0, 0], children: null, expanded: true, type: "list"},
        {path: [0, 0, 1], children: null, expanded: true},
        {path: [4], children: null, expanded: true},
        {path: [5], children: null},
        {path: ["0", "0,0", null, 0]}
      ],
      layout: {grid: []},
      type: "public",
      name: "assaas"
    },
    "79858145378714": {
      _id: "79858145378714",
      children: [{_id: "87908809625578"}],
      type: "conditional",
      props: [{_id: "44424746750874"}],
      name: "Login"
    },
    "87908809625578": {_id: "87908809625578"},
    "44424746750874": {_id: "44424746750874"},
    "34286625690291": {
      name: "Book",
      plural: "Books",
      type: "Data",
      properties: [
        {
          name: "title",
          type: "String",
          template: "String",
          _id: "98811030338675",
          required: true,
          validators: [],
          match: "dfdfdffsdss",
          requiredMessage: "asasasas",
          minlength: 3,
          maxlength: 20
        },
        {
          name: "61489883918264.manyToManyReverseFieldName",
          type: "Virtual",
          virtual: {
            name: "61489883918264.manyToManyReverseFieldName",
            type: "manyToMany",
            ref: "70321997766166.name",
            localField: "61489883918264.manyToManyReverseFieldName",
            foreignField: "61489883918264.name",
            _id: 96504265896807
          },
          _id: 52600760301794,
          _createdBy: "61489883918264.manyToManyReverseFieldName",
          template: "Virtual"
        },
        {
          name: "isbn",
          required: true,
          default: "11111",
          type: "Number",
          _id: "28733379178189",
          template: "Number",
          min: 1111,
          max: 999999
        },
        {
          name: "readCount",
          type: "Number",
          _id: "47716334165745",
          template: "Number",
          min: 0,
          unique: true
        }
      ],
      queries: [
        {
          name: "{34286625690291.name}ById",
          type: "findById",
          arguments: [{name: "id", _id: 37190550549985}],
          _id: 70370154527468,
          _createdBy: "34286625690291.type"
        },
        {
          name: "all{34286625690291.plural}",
          type: "find",
          arguments: [],
          _id: 98277283484560,
          _createdBy: "34286625690291.type",
          populate: [{}]
        },
        {
          name: "get_{34286625690291.plural}_by_{98811030338675.name}",
          type: "find",
          arguments: [{name: "{98811030338675.name}", _id: 94360389311607}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "{98811030338675.name}",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "94360389311607.name",
                      _id: 43236491645875
                    }
                  ],
                  _id: 94924143850054
                }
              ],
              _id: 31930921293183
            }
          ],
          _id: 44243236829962,
          _createdBy: "98811030338675.type"
        },
        {
          name:
            "get_{34286625690291.plural}_by_{28733379178189.name}WithValue",
          type: "find",
          arguments: [{name: "{28733379178189.name}", _id: 79918079967875}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "28733379178189.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "79918079967875.name",
                      _id: 82673432731720
                    }
                  ],
                  _id: 18548323869773
                }
              ],
              _id: 80456652330229
            }
          ],
          _id: 17935789985563,
          _createdBy: "28733379178189.type"
        },
        {
          name:
            "get_{34286625690291.plural}_by_{47716334165745.name}WithValue",
          type: "find",
          arguments: [{name: "{47716334165745.name}", _id: 68657186440961}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "47716334165745.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "68657186440961.name",
                      _id: 27999757675217
                    }
                  ],
                  _id: 55621945945467
                }
              ],
              _id: 12609601038974
            }
          ],
          _id: 56212231727858,
          _createdBy: "47716334165745.type"
        }
      ],
      mutations: [
        {
          name: "remove{34286625690291.name}ById",
          type: "findByIdAndDelete",
          arguments: [{name: "id", _id: 35090449730513}],
          _id: 90519884373040,
          _createdBy: "34286625690291.type"
        },
        {
          name: "create{34286625690291.name}",
          type: "create",
          arguments: [],
          _id: 71236765766315,
          _createdBy: "34286625690291.type"
        },
        {
          name: "set_{28733379178189.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 41686984273257},
            {name: "new_{28733379178189.name}", _id: 78587814052117}
          ],
          updates: [
            {
              field: "28733379178189.name",
              type: "set",
              fieldType: "Number",
              value: "78587814052117.name",
              _id: 2761753114660
            }
          ],
          _id: 4515873981463,
          _createdBy: "28733379178189.type"
        },
        {
          name: "unset_{28733379178189.name}",
          type: "findByIdAndUpdate",
          arguments: [{name: "id", _id: 72151601121667}],
          updates: [
            {
              field: "28733379178189.name",
              type: "unset",
              fieldType: "Number",
              _id: 98296773778894
            }
          ],
          _id: 26756591082433,
          _createdBy: "28733379178189.type"
        },
        {
          name: "increase_{28733379178189.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 69424766368917},
            {name: "increaseBy", defaultValue: 1, _id: 18012146130942}
          ],
          updates: [
            {
              field: "28733379178189.name",
              type: "inc",
              fieldType: "Number",
              value: "18012146130942.name",
              _id: 3844888063350
            }
          ],
          _id: 79477888735712,
          _createdBy: "28733379178189.type"
        },
        {
          name: "decrease_{28733379178189.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 93433921481574},
            {name: "decreaseBy", defaultValue: 1, _id: 21131126131380}
          ],
          updates: [
            {
              field: "28733379178189.name",
              type: "dec",
              fieldType: "Number",
              value: "21131126131380.name",
              _id: 97874798050897
            }
          ],
          _id: 56017788158438,
          _createdBy: "28733379178189.type"
        },
        {
          name: "set_{47716334165745.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 51687254933944},
            {name: "new_{47716334165745.name}", _id: 44470310478187}
          ],
          updates: [
            {
              field: "47716334165745.name",
              type: "set",
              fieldType: "Number",
              value: "44470310478187.name",
              _id: 23285851538313
            }
          ],
          _id: 93826356250044,
          _createdBy: "47716334165745.type"
        },
        {
          name: "unset_{47716334165745.name}",
          type: "findByIdAndUpdate",
          arguments: [{name: "id", _id: 14102092380904}],
          updates: [
            {
              field: "47716334165745.name",
              type: "unset",
              fieldType: "Number",
              _id: 85938082285260
            }
          ],
          _id: 12650315936146,
          _createdBy: "47716334165745.type"
        },
        {
          name: "increase_{47716334165745.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 89282277952646},
            {name: "increaseBy", defaultValue: 1, _id: 2043361525840}
          ],
          updates: [
            {
              field: "47716334165745.name",
              type: "inc",
              fieldType: "Number",
              value: "2043361525840.name",
              _id: 78996994139768
            }
          ],
          _id: 46497232423555,
          _createdBy: "47716334165745.type"
        },
        {
          name: "decrease_{47716334165745.name}",
          type: "findByIdAndUpdate",
          arguments: [
            {name: "id", _id: 24363528976746},
            {name: "decreaseBy", defaultValue: 1, _id: 72700768755723}
          ],
          updates: [
            {
              field: "47716334165745.name",
              type: "dec",
              fieldType: "Number",
              value: "72700768755723.name",
              _id: 46529387839644
            }
          ],
          _id: 1849446247104,
          _createdBy: "47716334165745.type"
        }
      ],
      routes: [
        {
          name: "remove{34286625690291.name}",
          endpoint: "{34286625690291.name}/$id",
          type: "DELETE",
          arguments: [{name: "id", _id: 9427029857494}],
          _id: 22975812356208,
          _createdBy: "34286625690291.type"
        }
      ],
      _id: "34286625690291",
      methods: []
    },
    "98811030338675": {
      name: "title",
      type: "String",
      template: "String",
      _id: "98811030338675",
      required: true,
      validators: [],
      match: "dfdfdffsdss",
      requiredMessage: "asasasas",
      minlength: 3,
      maxlength: 20
    },
    "52600760301794": {
      name: "61489883918264.manyToManyReverseFieldName",
      type: "Virtual",
      virtual: {
        name: "61489883918264.manyToManyReverseFieldName",
        type: "manyToMany",
        ref: "70321997766166.name",
        localField: "61489883918264.manyToManyReverseFieldName",
        foreignField: "61489883918264.name",
        _id: 96504265896807
      },
      _id: 52600760301794,
      _createdBy: "61489883918264.manyToManyReverseFieldName",
      template: "Virtual"
    },
    "28733379178189": {
      name: "isbn",
      required: true,
      default: "11111",
      type: "Number",
      _id: "28733379178189",
      template: "Number",
      min: 1111,
      max: 999999
    },
    "47716334165745": {
      name: "readCount",
      type: "Number",
      _id: "47716334165745",
      template: "Number",
      min: 0,
      unique: true
    },
    "70370154527468": {
      name: "{34286625690291.name}ById",
      type: "findById",
      arguments: [{name: "id", _id: 37190550549985}],
      _id: 70370154527468,
      _createdBy: "34286625690291.type"
    },
    "37190550549985": {name: "id", _id: 37190550549985},
    "98277283484560": {
      name: "all{34286625690291.plural}",
      type: "find",
      arguments: [],
      _id: 98277283484560,
      _createdBy: "34286625690291.type",
      populate: [{}]
    },
    "44243236829962": {
      name: "get_{34286625690291.plural}_by_{98811030338675.name}",
      type: "find",
      arguments: [{name: "{98811030338675.name}", _id: 94360389311607}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "{98811030338675.name}",
              subexpressions: [
                {
                  operator: "equals",
                  value: "94360389311607.name",
                  _id: 43236491645875
                }
              ],
              _id: 94924143850054
            }
          ],
          _id: 31930921293183
        }
      ],
      _id: 44243236829962,
      _createdBy: "98811030338675.type"
    },
    "94360389311607": {name: "{98811030338675.name}", _id: 94360389311607},
    "31930921293183": {
      type: "normal",
      expressions: [
        {
          field: "{98811030338675.name}",
          subexpressions: [
            {
              operator: "equals",
              value: "94360389311607.name",
              _id: 43236491645875
            }
          ],
          _id: 94924143850054
        }
      ],
      _id: 31930921293183
    },
    "94924143850054": {
      field: "{98811030338675.name}",
      subexpressions: [
        {
          operator: "equals",
          value: "94360389311607.name",
          _id: 43236491645875
        }
      ],
      _id: 94924143850054
    },
    "43236491645875": {
      operator: "equals",
      value: "94360389311607.name",
      _id: 43236491645875
    },
    "17935789985563": {
      name: "get_{34286625690291.plural}_by_{28733379178189.name}WithValue",
      type: "find",
      arguments: [{name: "{28733379178189.name}", _id: 79918079967875}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "28733379178189.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "79918079967875.name",
                  _id: 82673432731720
                }
              ],
              _id: 18548323869773
            }
          ],
          _id: 80456652330229
        }
      ],
      _id: 17935789985563,
      _createdBy: "28733379178189.type"
    },
    "79918079967875": {name: "{28733379178189.name}", _id: 79918079967875},
    "80456652330229": {
      type: "normal",
      expressions: [
        {
          field: "28733379178189.name",
          subexpressions: [
            {
              operator: "equals",
              value: "79918079967875.name",
              _id: 82673432731720
            }
          ],
          _id: 18548323869773
        }
      ],
      _id: 80456652330229
    },
    "18548323869773": {
      field: "28733379178189.name",
      subexpressions: [
        {
          operator: "equals",
          value: "79918079967875.name",
          _id: 82673432731720
        }
      ],
      _id: 18548323869773
    },
    "82673432731720": {
      operator: "equals",
      value: "79918079967875.name",
      _id: 82673432731720
    },
    "56212231727858": {
      name: "get_{34286625690291.plural}_by_{47716334165745.name}WithValue",
      type: "find",
      arguments: [{name: "{47716334165745.name}", _id: 68657186440961}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "47716334165745.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "68657186440961.name",
                  _id: 27999757675217
                }
              ],
              _id: 55621945945467
            }
          ],
          _id: 12609601038974
        }
      ],
      _id: 56212231727858,
      _createdBy: "47716334165745.type"
    },
    "68657186440961": {name: "{47716334165745.name}", _id: 68657186440961},
    "12609601038974": {
      type: "normal",
      expressions: [
        {
          field: "47716334165745.name",
          subexpressions: [
            {
              operator: "equals",
              value: "68657186440961.name",
              _id: 27999757675217
            }
          ],
          _id: 55621945945467
        }
      ],
      _id: 12609601038974
    },
    "55621945945467": {
      field: "47716334165745.name",
      subexpressions: [
        {
          operator: "equals",
          value: "68657186440961.name",
          _id: 27999757675217
        }
      ],
      _id: 55621945945467
    },
    "27999757675217": {
      operator: "equals",
      value: "68657186440961.name",
      _id: 27999757675217
    },
    "90519884373040": {
      name: "remove{34286625690291.name}ById",
      type: "findByIdAndDelete",
      arguments: [{name: "id", _id: 35090449730513}],
      _id: 90519884373040,
      _createdBy: "34286625690291.type"
    },
    "35090449730513": {name: "id", _id: 35090449730513},
    "71236765766315": {
      name: "create{34286625690291.name}",
      type: "create",
      arguments: [],
      _id: 71236765766315,
      _createdBy: "34286625690291.type"
    },
    "4515873981463": {
      name: "set_{28733379178189.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 41686984273257},
        {name: "new_{28733379178189.name}", _id: 78587814052117}
      ],
      updates: [
        {
          field: "28733379178189.name",
          type: "set",
          fieldType: "Number",
          value: "78587814052117.name",
          _id: 2761753114660
        }
      ],
      _id: 4515873981463,
      _createdBy: "28733379178189.type"
    },
    "41686984273257": {name: "id", _id: 41686984273257},
    "78587814052117": {
      name: "new_{28733379178189.name}",
      _id: 78587814052117
    },
    "2761753114660": {
      field: "28733379178189.name",
      type: "set",
      fieldType: "Number",
      value: "78587814052117.name",
      _id: 2761753114660
    },
    "26756591082433": {
      name: "unset_{28733379178189.name}",
      type: "findByIdAndUpdate",
      arguments: [{name: "id", _id: 72151601121667}],
      updates: [
        {
          field: "28733379178189.name",
          type: "unset",
          fieldType: "Number",
          _id: 98296773778894
        }
      ],
      _id: 26756591082433,
      _createdBy: "28733379178189.type"
    },
    "72151601121667": {name: "id", _id: 72151601121667},
    "98296773778894": {
      field: "28733379178189.name",
      type: "unset",
      fieldType: "Number",
      _id: 98296773778894
    },
    "79477888735712": {
      name: "increase_{28733379178189.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 69424766368917},
        {name: "increaseBy", defaultValue: 1, _id: 18012146130942}
      ],
      updates: [
        {
          field: "28733379178189.name",
          type: "inc",
          fieldType: "Number",
          value: "18012146130942.name",
          _id: 3844888063350
        }
      ],
      _id: 79477888735712,
      _createdBy: "28733379178189.type"
    },
    "69424766368917": {name: "id", _id: 69424766368917},
    "18012146130942": {
      name: "increaseBy",
      defaultValue: 1,
      _id: 18012146130942
    },
    "3844888063350": {
      field: "28733379178189.name",
      type: "inc",
      fieldType: "Number",
      value: "18012146130942.name",
      _id: 3844888063350
    },
    "56017788158438": {
      name: "decrease_{28733379178189.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 93433921481574},
        {name: "decreaseBy", defaultValue: 1, _id: 21131126131380}
      ],
      updates: [
        {
          field: "28733379178189.name",
          type: "dec",
          fieldType: "Number",
          value: "21131126131380.name",
          _id: 97874798050897
        }
      ],
      _id: 56017788158438,
      _createdBy: "28733379178189.type"
    },
    "93433921481574": {name: "id", _id: 93433921481574},
    "21131126131380": {
      name: "decreaseBy",
      defaultValue: 1,
      _id: 21131126131380
    },
    "97874798050897": {
      field: "28733379178189.name",
      type: "dec",
      fieldType: "Number",
      value: "21131126131380.name",
      _id: 97874798050897
    },
    "93826356250044": {
      name: "set_{47716334165745.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 51687254933944},
        {name: "new_{47716334165745.name}", _id: 44470310478187}
      ],
      updates: [
        {
          field: "47716334165745.name",
          type: "set",
          fieldType: "Number",
          value: "44470310478187.name",
          _id: 23285851538313
        }
      ],
      _id: 93826356250044,
      _createdBy: "47716334165745.type"
    },
    "51687254933944": {name: "id", _id: 51687254933944},
    "44470310478187": {
      name: "new_{47716334165745.name}",
      _id: 44470310478187
    },
    "23285851538313": {
      field: "47716334165745.name",
      type: "set",
      fieldType: "Number",
      value: "44470310478187.name",
      _id: 23285851538313
    },
    "12650315936146": {
      name: "unset_{47716334165745.name}",
      type: "findByIdAndUpdate",
      arguments: [{name: "id", _id: 14102092380904}],
      updates: [
        {
          field: "47716334165745.name",
          type: "unset",
          fieldType: "Number",
          _id: 85938082285260
        }
      ],
      _id: 12650315936146,
      _createdBy: "47716334165745.type"
    },
    "14102092380904": {name: "id", _id: 14102092380904},
    "85938082285260": {
      field: "47716334165745.name",
      type: "unset",
      fieldType: "Number",
      _id: 85938082285260
    },
    "46497232423555": {
      name: "increase_{47716334165745.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 89282277952646},
        {name: "increaseBy", defaultValue: 1, _id: 2043361525840}
      ],
      updates: [
        {
          field: "47716334165745.name",
          type: "inc",
          fieldType: "Number",
          value: "2043361525840.name",
          _id: 78996994139768
        }
      ],
      _id: 46497232423555,
      _createdBy: "47716334165745.type"
    },
    "89282277952646": {name: "id", _id: 89282277952646},
    "2043361525840": {
      name: "increaseBy",
      defaultValue: 1,
      _id: 2043361525840
    },
    "78996994139768": {
      field: "47716334165745.name",
      type: "inc",
      fieldType: "Number",
      value: "2043361525840.name",
      _id: 78996994139768
    },
    "1849446247104": {
      name: "decrease_{47716334165745.name}",
      type: "findByIdAndUpdate",
      arguments: [
        {name: "id", _id: 24363528976746},
        {name: "decreaseBy", defaultValue: 1, _id: 72700768755723}
      ],
      updates: [
        {
          field: "47716334165745.name",
          type: "dec",
          fieldType: "Number",
          value: "72700768755723.name",
          _id: 46529387839644
        }
      ],
      _id: 1849446247104,
      _createdBy: "47716334165745.type"
    },
    "24363528976746": {name: "id", _id: 24363528976746},
    "72700768755723": {
      name: "decreaseBy",
      defaultValue: 1,
      _id: 72700768755723
    },
    "46529387839644": {
      field: "47716334165745.name",
      type: "dec",
      fieldType: "Number",
      value: "72700768755723.name",
      _id: 46529387839644
    },
    "22975812356208": {
      name: "remove{34286625690291.name}",
      endpoint: "{34286625690291.name}/$id",
      type: "DELETE",
      arguments: [{name: "id", _id: 9427029857494}],
      _id: 22975812356208,
      _createdBy: "34286625690291.type"
    },
    "9427029857494": {name: "id", _id: 9427029857494},
    "20825084921224": {
      name: "Publisher",
      plural: "Publishers",
      type: "Account",
      properties: [
        {
          name: "companyName",
          required: true,
          type: "String",
          template: "String",
          unique: true,
          _id: "27302500136108",
          requiredMessage: "A company name is required",
          match: "/[A-Za-z ]*/",
          lowercase: false,
          trim: true,
          index: true,
          alias: "name",
          default: "Untitled Publisher",
          minlength: 2,
          maxlength: 30
        },
        {
          name: "59909358254229.manyToManyReverseFieldName",
          type: "Virtual",
          virtual: {
            name: "59909358254229.manyToManyReverseFieldName",
            type: "ManyToMany",
            ref: "70321997766166.name",
            localField: "59909358254229.manyToManyReverseFieldName",
            foreignField: "59909358254229.name",
            _id: 75740487881248
          },
          _id: 63929069453846,
          _createdBy: "59909358254229.manyToManyReverseFieldName",
          template: "Virtual"
        },
        {
          name: "hashed_password",
          type: "String",
          required: true,
          requiredMessage: "Password is required",
          validators: [
            {
              name: "checkPassword",
              function: {
                template: "accountValidationHashedPassword",
                _id: 69440801404933
              },
              _id: 46406435066590
            }
          ],
          _id: 34470078665190,
          _createdBy: "20825084921224.type"
        },
        {
          name: "salt",
          type: "String",
          _id: 90735258872236,
          _createdBy: "20825084921224.type"
        },
        {
          name: "password",
          type: "Virtual",
          virtual: {
            type: "custom",
            get: {
              template: "accountVirtualPasswordGet",
              _id: 74033049597261
            },
            set: {
              template: "accountVirtualPasswordSet",
              _id: 72612932538252
            },
            _id: 25369561089941
          },
          _id: 68462383319154,
          _createdBy: "20825084921224.type"
        },
        {
          name: "email",
          trim: true,
          type: "String",
          unique: true,
          uniqueMessage: "Email already exists",
          match: "/.+@.+..+/",
          required: true,
          requiredMessage: "Email is required",
          _id: 94779169130137,
          _createdBy: "20825084921224.type"
        }
      ],
      queries: [
        {
          name: "get_{20825084921224.plural}_by_{27302500136108.name}",
          type: "find",
          arguments: [{name: "{27302500136108.name}", _id: 44901979244985}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "27302500136108.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "44901979244985.name",
                      _id: 82795488928685
                    }
                  ],
                  _id: 84359152754779
                }
              ],
              _id: 2354991496337
            }
          ],
          _id: 45993069851034,
          _createdBy: "27302500136108.type"
        },
        {
          name: "whoami",
          type: "custom",
          arguments: [{name: "id", _id: 92210990726143}],
          _id: 6971889706117,
          _createdBy: "20825084921224.type"
        }
      ],
      mutations: [
        {
          name: "{20825084921224.name}SignIn",
          type: "custom",
          arguments: [{name: "id", _id: 45899200517932}],
          template: {template: "accountSignIn", _id: 36978276960563},
          _id: 59424869993868,
          _createdBy: "20825084921224.type"
        },
        {
          name: "{20825084921224.name}SignOut",
          type: "custom",
          arguments: [{name: "id", _id: 98760928127618}],
          template: {template: "accountSignOut", _id: 50718924466166},
          _id: 73582119841790,
          _createdBy: "20825084921224.type"
        },
        {
          name: "{20825084921224.name}SignUp",
          type: "create",
          arguments: [],
          _id: 93918890385657,
          _createdBy: "20825084921224.type"
        },
        {
          name: "delete{20825084921224.name}Account",
          type: "delete",
          arguments: [],
          _id: 87468036186098,
          _createdBy: "20825084921224.type"
        }
      ],
      methods: [
        {
          name: "authenticate",
          function: {
            template: "accountMethodAuthenticate",
            _id: 74578877994105
          },
          _id: 84689366412146,
          _createdBy: "20825084921224.type"
        },
        {
          name: "makeSalt",
          function: {
            template: "accountMethodMakeSalt",
            _id: 81327814186069
          },
          _id: 90706092775338,
          _createdBy: "20825084921224.type"
        },
        {
          name: "encryptPassword",
          function: {
            template: "accountMethodEncryptPassword",
            _id: 75925186964217
          },
          _id: 36196820655860,
          _createdBy: "20825084921224.type"
        }
      ],
      routes: [
        {
          name: "login",
          type: "POST",
          endpoint: "{20825084921224.name}/login",
          arguments: [
            {name: "email", _id: 51488928430339},
            {name: "password", _id: 43031926276168}
          ],
          _id: 44467054687265,
          _createdBy: "20825084921224.type"
        },
        {
          name: "logout",
          type: "POST",
          endpoint: "{20825084921224.name}/logout",
          arguments: [],
          _id: 47132451334323,
          _createdBy: "20825084921224.type"
        },
        {
          name: "signup",
          type: "POST",
          endpoint: "{20825084921224.name}/signup",
          arguments: [
            {name: "email", _id: 9733478481346},
            {name: "password", _id: 46226481545233}
          ],
          _id: 22861923837466,
          _createdBy: "20825084921224.type"
        }
      ],
      _id: "20825084921224"
    },
    "27302500136108": {
      name: "companyName",
      required: true,
      type: "String",
      template: "String",
      unique: true,
      _id: "27302500136108",
      requiredMessage: "A company name is required",
      match: "/[A-Za-z ]*/",
      lowercase: false,
      trim: true,
      index: true,
      alias: "name",
      default: "Untitled Publisher",
      minlength: 2,
      maxlength: 30
    },
    "63929069453846": {
      name: "59909358254229.manyToManyReverseFieldName",
      type: "Virtual",
      virtual: {
        name: "59909358254229.manyToManyReverseFieldName",
        type: "ManyToMany",
        ref: "70321997766166.name",
        localField: "59909358254229.manyToManyReverseFieldName",
        foreignField: "59909358254229.name",
        _id: 75740487881248
      },
      _id: 63929069453846,
      _createdBy: "59909358254229.manyToManyReverseFieldName",
      template: "Virtual"
    },
    "34470078665190": {
      name: "hashed_password",
      type: "String",
      required: true,
      requiredMessage: "Password is required",
      validators: [
        {
          name: "checkPassword",
          function: {
            template: "accountValidationHashedPassword",
            _id: 69440801404933
          },
          _id: 46406435066590
        }
      ],
      _id: 34470078665190,
      _createdBy: "20825084921224.type"
    },
    "46406435066590": {
      name: "checkPassword",
      function: {
        template: "accountValidationHashedPassword",
        _id: 69440801404933
      },
      _id: 46406435066590
    },
    "90735258872236": {
      name: "salt",
      type: "String",
      _id: 90735258872236,
      _createdBy: "20825084921224.type"
    },
    "68462383319154": {
      name: "password",
      type: "Virtual",
      virtual: {
        type: "custom",
        get: {template: "accountVirtualPasswordGet", _id: 74033049597261},
        set: {template: "accountVirtualPasswordSet", _id: 72612932538252},
        _id: 25369561089941
      },
      _id: 68462383319154,
      _createdBy: "20825084921224.type"
    },
    "94779169130137": {
      name: "email",
      trim: true,
      type: "String",
      unique: true,
      uniqueMessage: "Email already exists",
      match: "/.+@.+..+/",
      required: true,
      requiredMessage: "Email is required",
      _id: 94779169130137,
      _createdBy: "20825084921224.type"
    },
    "45993069851034": {
      name: "get_{20825084921224.plural}_by_{27302500136108.name}",
      type: "find",
      arguments: [{name: "{27302500136108.name}", _id: 44901979244985}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "27302500136108.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "44901979244985.name",
                  _id: 82795488928685
                }
              ],
              _id: 84359152754779
            }
          ],
          _id: 2354991496337
        }
      ],
      _id: 45993069851034,
      _createdBy: "27302500136108.type"
    },
    "44901979244985": {name: "{27302500136108.name}", _id: 44901979244985},
    "2354991496337": {
      type: "normal",
      expressions: [
        {
          field: "27302500136108.name",
          subexpressions: [
            {
              operator: "equals",
              value: "44901979244985.name",
              _id: 82795488928685
            }
          ],
          _id: 84359152754779
        }
      ],
      _id: 2354991496337
    },
    "84359152754779": {
      field: "27302500136108.name",
      subexpressions: [
        {
          operator: "equals",
          value: "44901979244985.name",
          _id: 82795488928685
        }
      ],
      _id: 84359152754779
    },
    "82795488928685": {
      operator: "equals",
      value: "44901979244985.name",
      _id: 82795488928685
    },
    "6971889706117": {
      name: "whoami",
      type: "custom",
      arguments: [{name: "id", _id: 92210990726143}],
      _id: 6971889706117,
      _createdBy: "20825084921224.type"
    },
    "92210990726143": {name: "id", _id: 92210990726143},
    "59424869993868": {
      name: "{20825084921224.name}SignIn",
      type: "custom",
      arguments: [{name: "id", _id: 45899200517932}],
      template: {template: "accountSignIn", _id: 36978276960563},
      _id: 59424869993868,
      _createdBy: "20825084921224.type"
    },
    "45899200517932": {name: "id", _id: 45899200517932},
    "73582119841790": {
      name: "{20825084921224.name}SignOut",
      type: "custom",
      arguments: [{name: "id", _id: 98760928127618}],
      template: {template: "accountSignOut", _id: 50718924466166},
      _id: 73582119841790,
      _createdBy: "20825084921224.type"
    },
    "98760928127618": {name: "id", _id: 98760928127618},
    "93918890385657": {
      name: "{20825084921224.name}SignUp",
      type: "create",
      arguments: [],
      _id: 93918890385657,
      _createdBy: "20825084921224.type"
    },
    "87468036186098": {
      name: "delete{20825084921224.name}Account",
      type: "delete",
      arguments: [],
      _id: 87468036186098,
      _createdBy: "20825084921224.type"
    },
    "84689366412146": {
      name: "authenticate",
      function: {
        template: "accountMethodAuthenticate",
        _id: 74578877994105
      },
      _id: 84689366412146,
      _createdBy: "20825084921224.type"
    },
    "90706092775338": {
      name: "makeSalt",
      function: {template: "accountMethodMakeSalt", _id: 81327814186069},
      _id: 90706092775338,
      _createdBy: "20825084921224.type"
    },
    "36196820655860": {
      name: "encryptPassword",
      function: {
        template: "accountMethodEncryptPassword",
        _id: 75925186964217
      },
      _id: 36196820655860,
      _createdBy: "20825084921224.type"
    },
    "44467054687265": {
      name: "login",
      type: "POST",
      endpoint: "{20825084921224.name}/login",
      arguments: [
        {name: "email", _id: 51488928430339},
        {name: "password", _id: 43031926276168}
      ],
      _id: 44467054687265,
      _createdBy: "20825084921224.type"
    },
    "51488928430339": {name: "email", _id: 51488928430339},
    "43031926276168": {name: "password", _id: 43031926276168},
    "47132451334323": {
      name: "logout",
      type: "POST",
      endpoint: "{20825084921224.name}/logout",
      arguments: [],
      _id: 47132451334323,
      _createdBy: "20825084921224.type"
    },
    "22861923837466": {
      name: "signup",
      type: "POST",
      endpoint: "{20825084921224.name}/signup",
      arguments: [
        {name: "email", _id: 9733478481346},
        {name: "password", _id: 46226481545233}
      ],
      _id: 22861923837466,
      _createdBy: "20825084921224.type"
    },
    "9733478481346": {name: "email", _id: 9733478481346},
    "46226481545233": {name: "password", _id: 46226481545233},
    "63134275919902": {
      name: "Comic",
      plural: "Comics",
      type: "Data",
      queries: [
        {
          name: "{63134275919902.name}ById",
          type: "findById",
          arguments: [{name: "id", _id: 34587527347670}],
          _id: 74784035380828,
          _createdBy: "63134275919902.type"
        },
        {
          name: "all{63134275919902.plural}",
          type: "find",
          arguments: [],
          _id: 53791599641692,
          _createdBy: "63134275919902.type"
        }
      ],
      mutations: [
        {
          name: "remove{63134275919902.name}ById",
          type: "findByIdAndDelete",
          arguments: [{name: "id", _id: 57730664250274}],
          _id: 1890275902624,
          _createdBy: "63134275919902.type"
        },
        {
          name: "create{63134275919902.name}",
          type: "create",
          arguments: [],
          _id: 90283053368918,
          _createdBy: "63134275919902.type"
        }
      ],
      routes: [
        {
          name: "remove{63134275919902.name}",
          endpoint: "{63134275919902.name}/$id",
          type: "DELETE",
          arguments: [{name: "id", _id: 30285979531613}],
          _id: 1918666820876,
          _createdBy: "63134275919902.type"
        },
        {
          name: "create{63134275919902.name}",
          endpoint: "{63134275919902.name}",
          type: "POST",
          arguments: [{name: "id", _id: 29947426463393}],
          _id: 21652291549902,
          _createdBy: "63134275919902.type"
        },
        {
          name: "update{63134275919902.name}",
          endpoint: "{63134275919902.name}/$id",
          type: "PUT",
          arguments: [{name: "id", _id: 27383979829176}],
          _id: 70191452300927,
          _createdBy: "63134275919902.type"
        }
      ],
      _id: "63134275919902"
    },
    "74784035380828": {
      name: "{63134275919902.name}ById",
      type: "findById",
      arguments: [{name: "id", _id: 34587527347670}],
      _id: 74784035380828,
      _createdBy: "63134275919902.type"
    },
    "34587527347670": {name: "id", _id: 34587527347670},
    "53791599641692": {
      name: "all{63134275919902.plural}",
      type: "find",
      arguments: [],
      _id: 53791599641692,
      _createdBy: "63134275919902.type"
    },
    "1890275902624": {
      name: "remove{63134275919902.name}ById",
      type: "findByIdAndDelete",
      arguments: [{name: "id", _id: 57730664250274}],
      _id: 1890275902624,
      _createdBy: "63134275919902.type"
    },
    "57730664250274": {name: "id", _id: 57730664250274},
    "90283053368918": {
      name: "create{63134275919902.name}",
      type: "create",
      arguments: [],
      _id: 90283053368918,
      _createdBy: "63134275919902.type"
    },
    "1918666820876": {
      name: "remove{63134275919902.name}",
      endpoint: "{63134275919902.name}/$id",
      type: "DELETE",
      arguments: [{name: "id", _id: 30285979531613}],
      _id: 1918666820876,
      _createdBy: "63134275919902.type"
    },
    "30285979531613": {name: "id", _id: 30285979531613},
    "21652291549902": {
      name: "create{63134275919902.name}",
      endpoint: "{63134275919902.name}",
      type: "POST",
      arguments: [{name: "id", _id: 29947426463393}],
      _id: 21652291549902,
      _createdBy: "63134275919902.type"
    },
    "29947426463393": {name: "id", _id: 29947426463393},
    "70191452300927": {
      name: "update{63134275919902.name}",
      endpoint: "{63134275919902.name}/$id",
      type: "PUT",
      arguments: [{name: "id", _id: 27383979829176}],
      _id: 70191452300927,
      _createdBy: "63134275919902.type"
    },
    "27383979829176": {name: "id", _id: 27383979829176},
    "59154778900496": {
      name: "Review",
      plural: "Reviews",
      type: "Data",
      properties: [
        {
          name: "title",
          type: "String",
          _id: "15990967430790",
          template: "String"
        },
        {
          name: "content",
          type: "String",
          _id: "96658280739592",
          template: "String"
        },
        {
          name: "book",
          type: "OneToOne",
          _id: "20543265384283",
          oneToOneRelation: "34286625690291.name"
        }
      ],
      queries: [
        {
          name: "{59154778900496.name}ById",
          type: "findById",
          arguments: [{name: "id", _id: 7023009448157}],
          _id: 37129364238582,
          _createdBy: "59154778900496.type"
        },
        {
          name: "all{59154778900496.plural}",
          type: "find",
          arguments: [],
          _id: 76066929674674,
          _createdBy: "59154778900496.type"
        },
        {
          name: "get_{59154778900496.plural}_by_{15990967430790.name}",
          type: "find",
          arguments: [{name: "{15990967430790.name}", _id: 94518635890494}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "15990967430790.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "94518635890494.name",
                      _id: 3549071779522
                    }
                  ],
                  _id: 40462771104085
                }
              ],
              _id: 83836181895774
            }
          ],
          _id: 55555492476731,
          _createdBy: "15990967430790.type"
        },
        {
          name: "get_{59154778900496.plural}_by_{96658280739592.name}",
          type: "find",
          arguments: [{name: "{96658280739592.name}", _id: 51212253071201}],
          conditions: [
            {
              type: "normal",
              expressions: [
                {
                  field: "96658280739592.name",
                  subexpressions: [
                    {
                      operator: "equals",
                      value: "51212253071201.name",
                      _id: 42809130697690
                    }
                  ],
                  _id: 8870968552980
                }
              ],
              _id: 32311417480989
            }
          ],
          _id: 96671370969051,
          _createdBy: "96658280739592.type"
        }
      ],
      mutations: [
        {
          name: "remove{59154778900496.name}ById",
          type: "findByIdAndDelete",
          arguments: [{name: "id", _id: 97636905810733}],
          _id: 44523485132072,
          _createdBy: "59154778900496.type"
        },
        {
          name: "create{59154778900496.name}",
          type: "create",
          arguments: [],
          _id: 88172655258889,
          _createdBy: "59154778900496.type"
        }
      ],
      routes: [
        {
          name: "remove{59154778900496.name}",
          endpoint: "{59154778900496.name}/$id",
          type: "DELETE",
          arguments: [{name: "id", _id: 92054821633118}],
          _id: 17123355884993,
          _createdBy: "59154778900496.type"
        },
        {
          name: "create{59154778900496.name}",
          endpoint: "{59154778900496.name}",
          type: "POST",
          arguments: [{name: "id", _id: 84324071641791}],
          _id: 92825724830412,
          _createdBy: "59154778900496.type"
        },
        {
          name: "update{59154778900496.name}",
          endpoint: "{59154778900496.name}/$id",
          type: "PUT",
          arguments: [{name: "id", _id: 87753933754020}],
          _id: 71339244249274,
          _createdBy: "59154778900496.type"
        }
      ],
      _id: "59154778900496"
    },
    "15990967430790": {
      name: "title",
      type: "String",
      _id: "15990967430790",
      template: "String"
    },
    "96658280739592": {
      name: "content",
      type: "String",
      _id: "96658280739592",
      template: "String"
    },
    "20543265384283": {
      name: "book",
      type: "OneToOne",
      _id: "20543265384283",
      oneToOneRelation: "34286625690291.name"
    },
    "37129364238582": {
      name: "{59154778900496.name}ById",
      type: "findById",
      arguments: [{name: "id", _id: 7023009448157}],
      _id: 37129364238582,
      _createdBy: "59154778900496.type"
    },
    "7023009448157": {name: "id", _id: 7023009448157},
    "76066929674674": {
      name: "all{59154778900496.plural}",
      type: "find",
      arguments: [],
      _id: 76066929674674,
      _createdBy: "59154778900496.type"
    },
    "55555492476731": {
      name: "get_{59154778900496.plural}_by_{15990967430790.name}",
      type: "find",
      arguments: [{name: "{15990967430790.name}", _id: 94518635890494}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "15990967430790.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "94518635890494.name",
                  _id: 3549071779522
                }
              ],
              _id: 40462771104085
            }
          ],
          _id: 83836181895774
        }
      ],
      _id: 55555492476731,
      _createdBy: "15990967430790.type"
    },
    "94518635890494": {name: "{15990967430790.name}", _id: 94518635890494},
    "83836181895774": {
      type: "normal",
      expressions: [
        {
          field: "15990967430790.name",
          subexpressions: [
            {
              operator: "equals",
              value: "94518635890494.name",
              _id: 3549071779522
            }
          ],
          _id: 40462771104085
        }
      ],
      _id: 83836181895774
    },
    "40462771104085": {
      field: "15990967430790.name",
      subexpressions: [
        {
          operator: "equals",
          value: "94518635890494.name",
          _id: 3549071779522
        }
      ],
      _id: 40462771104085
    },
    "3549071779522": {
      operator: "equals",
      value: "94518635890494.name",
      _id: 3549071779522
    },
    "96671370969051": {
      name: "get_{59154778900496.plural}_by_{96658280739592.name}",
      type: "find",
      arguments: [{name: "{96658280739592.name}", _id: 51212253071201}],
      conditions: [
        {
          type: "normal",
          expressions: [
            {
              field: "96658280739592.name",
              subexpressions: [
                {
                  operator: "equals",
                  value: "51212253071201.name",
                  _id: 42809130697690
                }
              ],
              _id: 8870968552980
            }
          ],
          _id: 32311417480989
        }
      ],
      _id: 96671370969051,
      _createdBy: "96658280739592.type"
    },
    "51212253071201": {name: "{96658280739592.name}", _id: 51212253071201},
    "32311417480989": {
      type: "normal",
      expressions: [
        {
          field: "96658280739592.name",
          subexpressions: [
            {
              operator: "equals",
              value: "51212253071201.name",
              _id: 42809130697690
            }
          ],
          _id: 8870968552980
        }
      ],
      _id: 32311417480989
    },
    "8870968552980": {
      field: "96658280739592.name",
      subexpressions: [
        {
          operator: "equals",
          value: "51212253071201.name",
          _id: 42809130697690
        }
      ],
      _id: 8870968552980
    },
    "42809130697690": {
      operator: "equals",
      value: "51212253071201.name",
      _id: 42809130697690
    },
    "44523485132072": {
      name: "remove{59154778900496.name}ById",
      type: "findByIdAndDelete",
      arguments: [{name: "id", _id: 97636905810733}],
      _id: 44523485132072,
      _createdBy: "59154778900496.type"
    },
    "97636905810733": {name: "id", _id: 97636905810733},
    "88172655258889": {
      name: "create{59154778900496.name}",
      type: "create",
      arguments: [],
      _id: 88172655258889,
      _createdBy: "59154778900496.type"
    },
    "17123355884993": {
      name: "remove{59154778900496.name}",
      endpoint: "{59154778900496.name}/$id",
      type: "DELETE",
      arguments: [{name: "id", _id: 92054821633118}],
      _id: 17123355884993,
      _createdBy: "59154778900496.type"
    },
    "92054821633118": {name: "id", _id: 92054821633118},
    "92825724830412": {
      name: "create{59154778900496.name}",
      endpoint: "{59154778900496.name}",
      type: "POST",
      arguments: [{name: "id", _id: 84324071641791}],
      _id: 92825724830412,
      _createdBy: "59154778900496.type"
    },
    "84324071641791": {name: "id", _id: 84324071641791},
    "71339244249274": {
      name: "update{59154778900496.name}",
      endpoint: "{59154778900496.name}/$id",
      type: "PUT",
      arguments: [{name: "id", _id: 87753933754020}],
      _id: 71339244249274,
      _createdBy: "59154778900496.type"
    },
    "87753933754020": {name: "id", _id: 87753933754020},
    "31731143103197": {
      name: "Reviewer",
      plural: "Reviewer",
      type: "Account",
      properties: [
        {
          name: "hashed_password",
          type: "String",
          required: true,
          requiredMessage: "Password is required",
          validators: [
            {
              name: "checkPassword",
              function: {
                template: "accountValidationHashedPassword",
                _id: 82402540060769
              },
              _id: 97614418955323
            }
          ],
          _id: 22755194596040,
          _createdBy: "31731143103197.type"
        },
        {
          name: "salt",
          type: "String",
          _id: 38184324411792,
          _createdBy: "31731143103197.type"
        },
        {
          name: "password",
          type: "Virtual",
          virtual: {
            type: "custom",
            get: {
              template: "accountVirtualPasswordGet",
              _id: 4382560165098
            },
            set: {
              template: "accountVirtualPasswordSet",
              _id: 77562345768130
            },
            _id: 91343887153354
          },
          _id: 15636653974948,
          _createdBy: "31731143103197.type"
        },
        {
          name: "email",
          trim: true,
          type: "String",
          unique: true,
          uniqueMessage: "Email already exists",
          match: "/.+@.+..+/",
          required: true,
          requiredMessage: "Email is required",
          _id: 96966304888489,
          _createdBy: "31731143103197.type"
        }
      ],
      queries: [
        {
          name: "whoami",
          type: "custom",
          arguments: [{name: "id", _id: 54042279615854}],
          _id: 48278784489882,
          _createdBy: "31731143103197.type"
        }
      ],
      mutations: [
        {
          name: "{31731143103197.name}SignIn",
          type: "custom",
          arguments: [{name: "id", _id: 95566163456222}],
          template: {template: "accountSignIn", _id: 34434651085205},
          _id: 10399841299116,
          _createdBy: "31731143103197.type"
        },
        {
          name: "{31731143103197.name}SignOut",
          type: "custom",
          arguments: [{name: "id", _id: 47156537030606}],
          template: {template: "accountSignOut", _id: 70540569955564},
          _id: 16085332896332,
          _createdBy: "31731143103197.type"
        },
        {
          name: "{31731143103197.name}SignUp",
          type: "create",
          arguments: [],
          _id: 23973786153310,
          _createdBy: "31731143103197.type"
        },
        {
          name: "delete{31731143103197.name}Account",
          type: "delete",
          arguments: [],
          _id: 90576630000221,
          _createdBy: "31731143103197.type"
        }
      ],
      methods: [
        {
          name: "authenticate",
          function: {
            template: "accountMethodAuthenticate",
            _id: 33259041370122
          },
          _id: 15678643556830,
          _createdBy: "31731143103197.type"
        },
        {
          name: "makeSalt",
          function: {
            template: "accountMethodMakeSalt",
            _id: 23604578026860
          },
          _id: 92199534969472,
          _createdBy: "31731143103197.type"
        },
        {
          name: "encryptPassword",
          function: {
            template: "accountMethodEncryptPassword",
            _id: 21294654401004
          },
          _id: 12411723270782,
          _createdBy: "31731143103197.type"
        }
      ],
      routes: [
        {
          name: "login",
          type: "POST",
          endpoint: "{31731143103197.name}/login",
          arguments: [
            {name: "email", _id: 48404052401503},
            {name: "password", _id: 21766381523750}
          ],
          _id: 15492573550957,
          _createdBy: "31731143103197.type"
        },
        {
          name: "logout",
          type: "POST",
          endpoint: "{31731143103197.name}/logout",
          arguments: [],
          _id: 72280382614423,
          _createdBy: "31731143103197.type"
        },
        {
          name: "signup",
          type: "POST",
          endpoint: "{31731143103197.name}/signup",
          arguments: [
            {name: "email", _id: 55381857310768},
            {name: "password", _id: 4710583235200}
          ],
          _id: 86516658393283,
          _createdBy: "31731143103197.type"
        }
      ],
      _id: "31731143103197"
    },
    "22755194596040": {
      name: "hashed_password",
      type: "String",
      required: true,
      requiredMessage: "Password is required",
      validators: [
        {
          name: "checkPassword",
          function: {
            template: "accountValidationHashedPassword",
            _id: 82402540060769
          },
          _id: 97614418955323
        }
      ],
      _id: 22755194596040,
      _createdBy: "31731143103197.type"
    },
    "97614418955323": {
      name: "checkPassword",
      function: {
        template: "accountValidationHashedPassword",
        _id: 82402540060769
      },
      _id: 97614418955323
    },
    "38184324411792": {
      name: "salt",
      type: "String",
      _id: 38184324411792,
      _createdBy: "31731143103197.type"
    },
    "15636653974948": {
      name: "password",
      type: "Virtual",
      virtual: {
        type: "custom",
        get: {template: "accountVirtualPasswordGet", _id: 4382560165098},
        set: {template: "accountVirtualPasswordSet", _id: 77562345768130},
        _id: 91343887153354
      },
      _id: 15636653974948,
      _createdBy: "31731143103197.type"
    },
    "96966304888489": {
      name: "email",
      trim: true,
      type: "String",
      unique: true,
      uniqueMessage: "Email already exists",
      match: "/.+@.+..+/",
      required: true,
      requiredMessage: "Email is required",
      _id: 96966304888489,
      _createdBy: "31731143103197.type"
    },
    "48278784489882": {
      name: "whoami",
      type: "custom",
      arguments: [{name: "id", _id: 54042279615854}],
      _id: 48278784489882,
      _createdBy: "31731143103197.type"
    },
    "54042279615854": {name: "id", _id: 54042279615854},
    "10399841299116": {
      name: "{31731143103197.name}SignIn",
      type: "custom",
      arguments: [{name: "id", _id: 95566163456222}],
      template: {template: "accountSignIn", _id: 34434651085205},
      _id: 10399841299116,
      _createdBy: "31731143103197.type"
    },
    "95566163456222": {name: "id", _id: 95566163456222},
    "16085332896332": {
      name: "{31731143103197.name}SignOut",
      type: "custom",
      arguments: [{name: "id", _id: 47156537030606}],
      template: {template: "accountSignOut", _id: 70540569955564},
      _id: 16085332896332,
      _createdBy: "31731143103197.type"
    },
    "47156537030606": {name: "id", _id: 47156537030606},
    "23973786153310": {
      name: "{31731143103197.name}SignUp",
      type: "create",
      arguments: [],
      _id: 23973786153310,
      _createdBy: "31731143103197.type"
    },
    "90576630000221": {
      name: "delete{31731143103197.name}Account",
      type: "delete",
      arguments: [],
      _id: 90576630000221,
      _createdBy: "31731143103197.type"
    },
    "15678643556830": {
      name: "authenticate",
      function: {
        template: "accountMethodAuthenticate",
        _id: 33259041370122
      },
      _id: 15678643556830,
      _createdBy: "31731143103197.type"
    },
    "92199534969472": {
      name: "makeSalt",
      function: {template: "accountMethodMakeSalt", _id: 23604578026860},
      _id: 92199534969472,
      _createdBy: "31731143103197.type"
    },
    "12411723270782": {
      name: "encryptPassword",
      function: {
        template: "accountMethodEncryptPassword",
        _id: 21294654401004
      },
      _id: 12411723270782,
      _createdBy: "31731143103197.type"
    },
    "15492573550957": {
      name: "login",
      type: "POST",
      endpoint: "{31731143103197.name}/login",
      arguments: [
        {name: "email", _id: 48404052401503},
        {name: "password", _id: 21766381523750}
      ],
      _id: 15492573550957,
      _createdBy: "31731143103197.type"
    },
    "48404052401503": {name: "email", _id: 48404052401503},
    "21766381523750": {name: "password", _id: 21766381523750},
    "72280382614423": {
      name: "logout",
      type: "POST",
      endpoint: "{31731143103197.name}/logout",
      arguments: [],
      _id: 72280382614423,
      _createdBy: "31731143103197.type"
    },
    "86516658393283": {
      name: "signup",
      type: "POST",
      endpoint: "{31731143103197.name}/signup",
      arguments: [
        {name: "email", _id: 55381857310768},
        {name: "password", _id: 4710583235200}
      ],
      _id: 86516658393283,
      _createdBy: "31731143103197.type"
    },
    "55381857310768": {name: "email", _id: 55381857310768},
    "4710583235200": {name: "password", _id: 4710583235200}
  }
}

