import URLMaker from './urlmaker.js'

var backendmodules = [{
    name: "RedEnvelope",
    href: "redEnvelope.html",
    icon: "desktop",
    system: "redpacket",
},
{
    name: "EZDelivery",
    href: "ezdelivery.html",
    icon: "desktop",
    activeRegex: /^ezdelivery.html/,
    system:"ezdelivery"
}, {
    name: "CMS",
    href: "cms.html",
    icon: "desktop",
    activeRegex: /^cms.html/,
    system:"cms"
}, {
    name: "Upload",
    href: "upload.html",
    icon: "desktop",
    activeRegex: /^upload.html/,
    system: "upload",
}, {
    name: "Admin",
    href: "adminManage.html",
    icon: "desktop",
    system: "admin",
    activeRegex: /^adminManage.html/
}, {
    name:"boost",
    href:"boost.html",
    icon:"desktop",
    activeRegex:/^boost.html/,
    system:"boost",
}, {
    name:"grabFromTaobao",
    href:"grabFromTaobao.html",
    icon:"desktop",
    activeRegex:/^grabFromTaobao.html/,
    system:"grabFromTaobao",
}, {
    name:"Channel管理",
    href:"channel.html",
    icon:"road",
    system:"channel",
    activeRegex:/^channel\.html/,
}, {
    name:"D2D",
    submenu:[
        {
            name:"司机管理",
            href:"d2d.html#/driver",
            icon:"male",
            system:"d2d",
            activeRegex:/^d2d\.html#\/driver/,
        },
        {
            name:"区域邮编管理",
            href:"d2d.html#/zip",
            icon:"",
            system:"d2d",
            activeRegex:/^d2d\.html#\/zip/
        },
        {
            name:"邮编地点映射",
            href:"d2d.html#/locationMapping",
            icon:"",
            system:"d2d",
            activeRegex:/^d2d\.html#\/locationMapping/
        },
        {
            name:"任务同步",
            href:"d2d.html#/sync_jobs",
            icon:"",
            system:"d2d",
            activeRegex:/^d2d\.html#\/sync_jobs/
        },
        {
            name:"配送作业管理",
            href:"d2d.html#/jobs",
            icon:"",
            system:"d2d",
            activeRegex:/^d2d\.html#\/jobs/
        },
        {
            name:"地图管理",
            href:"d2d.html#/map",
            icon:"",
            system:"d2d",
            activeRegex:/^d2d\.html#\/map/
        }
    ],
    icon:"bus",
    activeRegex:/^d2d\.html/
},{
    name:"Voucher",
    href:"voucher.html",
    icon:"desktop",
    system:"voucher",
    activeRegex:/^voucher\.html/,
}, {
    name:"新首页管理",
    submenu:[
        {
            name:"运营Banner",
            href:"newhomebanner.html#/operation",
            icon:"fa-life-ring",
            system:"newhomebanner",
            activeRegex:/^newhomebanner\.html#\/operation/,
        },
        {
            name:"热门商品",
            href:"newhomebanner.html#/hotProduct",
            icon:"fa-life-ring",
            system:"newhomebanner",
            activeRegex:/^newhomebanner\.html#\/hotProduct/,
        },
        {
            name:"市场Banner",
            href:"newhomebanner.html#/marketing",
            icon:"fa-life-ring",
            system:"newhomebanner",
            activeRegex:/^newhomebanner\.html#\/marketing/,
        },
        {
            name:"首页Collection",
            href:"newhomebanner.html#/homeCollections",
            icon:"fa-life-ring",
            system:"newhomebanner",
            activeRegex:/^newhomebanner\.html#\/homeCollections/,
        },
        {
            name:"PopBanner",
            href:"popBanner.html",
            icon:"desktop",
            system:"popBanner",
            activeRegex:/^popBanner\.html/,
        }
    ],
    icon:"tags",
    activeRegex:/^newhomebanner\.html/,
},{
    name:"goldParadise",
    href:"goldParadise.html",
    icon:"desktop",
    system:"voucher",
    activeRegex:/^goldParadise\.html/,
},{
    name: "promotion",
    submenu:[
        {
            name: "Bulma",
            href: "bulma.html",
            icon: "desktop",
            activeRegex: /^bulma.html/,
            system: "bulma",
        },{
            name: "FLASHSALE",
            href: "flashsale.html",
            icon: "desktop",
            activeRegex: /^flashsale.html/,
            system:"flashsale"
        },{
            name: "FeatureCollection",
            href: URLMaker.featurecollection.home(),
            activeRegex: /^featurecollection.html/,
            icon: "desktop",
            system: "featureColl",
        },{
            name: "19.9专区",
            href: "specialArea.html",
            activeRegex: /^specialArea\.html/,
            icon: "desktop",
            system: "specialArea",
        }
    ]
}, {
    name:'prime',
    submenu:[{
        name: "shops",
        href: "shops.html",
        icon: "desktop",
        activeRegex: /^shops.html/,
        system: "shops",
    },{
        name:"FixedBanner",
        href:"fixedBanner.html",
        icon:"fighter-jet",
        activeRegex:/^fixedBanner.html/,
        system:"fixedbanner",
    },{
        name:"primeFloor",
        href:"primeFloor.html",
        icon:"desktop",
        activeRegex:/^primeFloor.html/,
        system:"primefloor"
    },{
        name:"Wishlist",
        href:"wishlist.html",
        icon:"desktop",
        activeRegex:/^wishlist.html/,
        system:"wishlist"
    },{
        name: "primeDiscount",
        href: "primeDiscount.html",
        icon: "desktop",
        activeRegex: /^primeDiscount.html/,
        system: "primeDiscount"
    },{
        name: "importFlashData",
        href: "importFlashData.html",
        icon: "desktop",
        activeRegex: /^importFlashData.html/,
        system: "importFlashData"
    }]
}, {
    name:'Product',
    submenu:[{
        name: "Product",
        href: "product.html",
        icon: "desktop",
        activeRegex: /^product.html/,
        system: "product",
    },{
        name:"merchandise",
        href:"merchandise.html",
        icon:"desktop",
        activeRegex:/^merchandise.html/,
        system:"merchandise",
    },
    {
        name:"seedProduct",
        href:"seedproduct.html",
        icon:"fa fa-picture-o",
        activeRegex:/^seedproduct.html/,
        system:"seedproduct",
    },
    {
        name:"aliPropsMap",
        href:"aliPropsMap.html",
        icon:"fa fa-picture-o",
        activeRegex:/^aliPropsMap.html/,
        system:"aliPropsMap",
    }]
},{
    name:'Banner',
    submenu:[{
        name: "HomePage",
        href: "hpArrange.html",
        icon: "desktop",
        activeRegex: /^hpArrange.html/,
        system: "homepage",
    },{
        name:"guideImg",
        href:"guideImg.html",
        icon:"fa fa-picture-o",
        activeRegex:/^guideImg.html/,
        system:"guideImg",
    }]
},{
    name:'logs',
    submenu:[{
        name: "productChangeLogs",
        href: "productChangeLogs.html",
        icon: "desktop",
        activeRegex: /^productChangeLogs.html/,
        system: "productChangeLogs",
    }]
}];
export default backendmodules;
