const navlist = [{
        adminMenu: {
            id: 1,
            menuName: "宠物中心",
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
                    menuName: "小香猪",
                    menuType: "page",
                    pid: "1",
                    url: "/pet/pig",
                    sort: 3,
                    deep: 2,
                    code: "14"
                }
            },
            {
                adminMenu: {
                    id: 15,
                    menuName: "宠物用品",
                    menuType: "page",
                    pid: "1",
                    url: "/pet/goods",
                    sort: 5,
                    deep: 2,
                    code: "15"
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
            code: "2",
            permissions: "admin"
        },
        children: [{
                adminMenu: {
                    id: 21,
                    menuName: "全部账户",
                    menuType: "page",
                    pid: "2",
                    url: "/customer/index",
                    sort: 1,
                    deep: 2,
                    code: "21",
                    permissions: "admin"
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
                    code: "22",
                    permissions: "admin"
                }
            },
            {
                adminMenu: {
                    id: 23,
                    menuName: "管理员",
                    menuType: "page",
                    pid: "2",
                    url: "/customer/admin",
                    sort: 3,
                    deep: 2,
                    code: "23",
                    permissions: "admin"
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
                id: 52,
                menuName: "查看手册",
                menuType: "page",
                pid: "5",
                url: "/manual/look",
                sort: 2,
                deep: 2,
                code: "52"
            }
        }]
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
                    menuName: "宠物人生",
                    menuType: "page",
                    pid: "6",
                    url: "/count/life",
                    sort: 1,
                    deep: 2,
                    code: "61"
                }
            },
            {
                adminMenu: {
                    id: 62,
                    menuName: "信息分布",
                    menuType: "page",
                    pid: "6",
                    url: "/count/distribution",
                    sort: 2,
                    deep: 2,
                    code: "62"
                }
            }
        ]
    }, {
        adminMenu: {
            id: 7,
            menuName: "数据管理",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 1,
            deep: 1,
            code: "7",
            permissions: "admin"
        },
        children: [{
                adminMenu: {
                    id: 71,
                    menuName: "充值管理",
                    menuType: "page",
                    pid: "7",
                    url: "/manage/approval",
                    sort: 1,
                    deep: 2,
                    code: "71",
                    permissions: "admin"
                }
            }, {
                adminMenu: {
                    id: 72,
                    menuName: "订单管理",
                    menuType: "page",
                    pid: "7",
                    url: "/manage/order",
                    sort: 2,
                    deep: 2,
                    code: "72",
                    permissions: "admin"
                }
            }, {
                adminMenu: {
                    id: 74,
                    menuName: "寄养管理",
                    menuType: "page",
                    pid: "8",
                    url: "/manage/caremanage",
                    sort: 4,
                    deep: 2,
                    code: "74",
                    permissions: "admin"
                }
            },
            {
                adminMenu: {
                    id: 75,
                    menuName: "评论管理",
                    menuType: "page",
                    pid: "8",
                    url: "/manage/leavemessagemanage",
                    sort: 5,
                    deep: 2,
                    code: "75",
                    permissions: "admin"
                }
            }, {
                adminMenu: {
                    id: 76,
                    menuName: "宠物管理",
                    menuType: "page",
                    pid: "8",
                    url: "/manage/petmanage",
                    sort: 6,
                    deep: 2,
                    code: "76",
                    permissions: "admin"
                }
            }, {
                adminMenu: {
                    id: 77,
                    menuName: "商品管理",
                    menuType: "page",
                    pid: "8",
                    url: "/manage/goodsmanage",
                    sort: 7,
                    deep: 2,
                    code: "77",
                    permissions: "admin"
                }
            },
        ]
    },
    {
        adminMenu: {
            id: 8,
            menuName: "帮助",
            menuType: "list",
            pid: "0",
            url: "#",
            sort: 7,
            deep: 1,
            code: "8"
        },
        children: [{
                adminMenu: {
                    id: 81,
                    menuName: "帮助",
                    menuType: "page",
                    pid: "8",
                    url: "/help/help",
                    sort: 1,
                    deep: 2,
                    code: "81"
                }
            },
            {
                adminMenu: {
                    id: 82,
                    menuName: "关于我",
                    menuType: "page",
                    pid: "8",
                    url: "/help/about",
                    sort: 2,
                    deep: 2,
                    code: "82"
                }
            }
        ]
    }
]
export default {
    navlist
}