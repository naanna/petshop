const navlist = [{
        adminMenu: {
            id: 1,
            menuName: "宠物信息",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "1"
        },
        children: [{
                adminMenu: {
                    id: 11,
                    menuName: "全部宠物",
                    menuType: "page",
                    pid: "31",
                    url: "/pet/index",
                    sort: 1,
                    deep: 2,
                    code: "11"
                }
            },
            {
                adminMenu: {
                    id: 12,
                    menuName: "猫咪",
                    menuType: "page",
                    pid: "1",
                    url: "/pet/cat",
                    sort: 2,
                    deep: 2,
                    code: "12"
                }
            },
            {
                adminMenu: {
                    id: 13,
                    menuName: "狗狗",
                    menuType: "page",
                    pid: "1",
                    url: "/pet/dog",
                    sort: 3,
                    deep: 2,
                    code: "13"
                }
            },
            {
                adminMenu: {
                    id: 14,
                    menuName: "迷你猪",
                    menuType: "page",
                    pid: "1",
                    url: "/pet/pig",
                    sort: 3,
                    deep: 2,
                    code: "14"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 2,
            menuName: "会员管理",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "2"
        },
        children: [{
                adminMenu: {
                    id: 21,
                    menuName: "全部客户",
                    menuType: "page",
                    pid: "2",
                    url: "/customer/index",
                    sort: 1,
                    deep: 2,
                    code: "21"
                }
            },
            {
                adminMenu: {
                    id: 22,
                    menuName: "vip客户",
                    menuType: "page",
                    pid: "2",
                    url: "/customer/vip",
                    sort: 2,
                    deep: 2,
                    code: "22"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 3,
            menuName: "寄养中心",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "3"
        },
        children: [{
                adminMenu: {
                    id: 31,
                    menuName: "全部寄养",
                    menuType: "page",
                    pid: "3",
                    url: "/fostercare/index",
                    sort: 1,
                    deep: 2,
                    code: "31"
                }
            },
            {
                adminMenu: {
                    id: 32,
                    menuName: "我的寄养",
                    menuType: "page",
                    pid: "3",
                    url: "/fostercare/my",
                    sort: 2,
                    deep: 2,
                    code: "32"
                }
            },
            {
                adminMenu: {
                    id: 33,
                    menuName: "寄养规则",
                    menuType: "page",
                    pid: "3",
                    url: "/fostercare/rule",
                    sort: 3,
                    deep: 2,
                    code: "33"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 4,
            menuName: "留言板",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "4"
        },
        children: [{
                adminMenu: {
                    id: 41,
                    menuName: "评论管理",
                    menuType: "page",
                    pid: "4",
                    url: "/leavemessage/manage",
                    sort: 1,
                    deep: 2,
                    code: "41"
                }
            },
            {
                adminMenu: {
                    id: 42,
                    menuName: "查看评论",
                    menuType: "page",
                    pid: "4",
                    url: "/leavemessage/look",
                    sort: 2,
                    deep: 2,
                    code: "42"
                }
            },
            {
                adminMenu: {
                    id: 43,
                    menuName: "我的评论",
                    menuType: "page",
                    pid: "4",
                    url: "/leavemessage/my",
                    sort: 3,
                    deep: 2,
                    code: "43"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 5,
            menuName: "宝贝照顾手册",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "5"
        },
        children: [{
                adminMenu: {
                    id: 51,
                    menuName: "手册管理",
                    menuType: "page",
                    pid: "5",
                    url: "/manual/manage",
                    sort: 1,
                    deep: 2,
                    code: "51"
                }
            },
            {
                adminMenu: {
                    id: 52,
                    menuName: "查看手册",
                    menuType: "page",
                    pid: "5",
                    url: "/manual/look",
                    sort: 2,
                    deep: 2,
                    code: "52"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 6,
            menuName: "综合统计",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "6"
        },
        children: [{
                adminMenu: {
                    id: 61,
                    menuName: "本月受欢迎宠物",
                    menuType: "page",
                    pid: "6",
                    url: "/count/month",
                    sort: 1,
                    deep: 2,
                    code: "61"
                }
            },
            {
                adminMenu: {
                    id: 62,
                    menuName: "年度受欢迎宠物",
                    menuType: "page",
                    pid: "6",
                    url: "/count/year",
                    sort: 2,
                    deep: 2,
                    code: "62"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 7,
            menuName: "充值处理",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "7"
        },
        children: [{
            adminMenu: {
                id: 71,
                menuName: "管理员审批",
                menuType: "page",
                pid: "7",
                url: "/cost/approval",
                sort: 1,
                deep: 2,
                code: "71"
            }
        }]
    }, {
        adminMenu: {
            id: 8,
            menuName: "代售系统",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "8"
        },
        children: [{
                adminMenu: {
                    id: 81,
                    menuName: "代售管理",
                    menuType: "page",
                    pid: "8",
                    url: "/booking/manage",
                    sort: 1,
                    deep: 2,
                    code: "81"
                }
            },
            {
                adminMenu: {
                    id: 82,
                    menuName: "我的代售",
                    menuType: "page",
                    pid: "8",
                    url: "/booking/my",
                    sort: 2,
                    deep: 2,
                    code: "82"
                }
            },
            {
                adminMenu: {
                    id: 83,
                    menuName: "代售规则",
                    menuType: "page",
                    pid: "8",
                    url: "/booking/rule",
                    sort: 3,
                    deep: 2,
                    code: "83"
                }
            }
        ]
    },
    {
        adminMenu: {
            id: 9,
            menuName: "帮助",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 7,
            deep: 1,
            code: "9"
        },
        children: [{
                adminMenu: {
                    id: 91,
                    menuName: "帮助",
                    menuType: "page",
                    pid: "9",
                    url: "/help/help",
                    sort: 1,
                    deep: 2,
                    code: "91"
                }
            },
            {
                adminMenu: {
                    id: 92,
                    menuName: "关于我们",
                    menuType: "page",
                    pid: "9",
                    url: "/help/about",
                    sort: 2,
                    deep: 2,
                    code: "92"
                }
            }
        ]
    }
]
export default {
    navlist
}