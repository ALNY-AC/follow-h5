// @ts-nocheck
import { AddressEdit } from "vant";
// @ts-ignore
import area from "@/plugin/area.js";


import $ from "jquery";
export default {
    name: 'select-location',
    props: {},
    data() {
        return {
            title: '',
            areaList: area,
            show: false,
            active: '',
        };
    },
    methods: {
        setLocation(data) {
            localStorage._area = JSON.stringify(data);
            this.title = '';
            this.$emit('select', this.getLocation());
        },
        getLocation() {
            return localStorage._area ? JSON.parse(localStorage._area) : [];
        },
        confirm(data) {
            this.setLocation(data);
            this.show = false;
        },
        cancel() {
            this.show = false;
        },
        container() {
            return document.getElementsByTagName('body')[0];
        },
        clear() {
            localStorage.removeItem('_area');
        },
        update() {
            //取得地址
            if (this.getLocation().length <= 0) {

                // $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', () => {
                //     // alert(remote_ip_info.country);//国家  
                //     // alert(remote_ip_info.province);//省份  
                //     // alert(remote_ip_info.city);//城市  

                //     let location = remote_ip_info;
                //     let city = location.city;
                //     let value = '';
                //     let city_list = this.areaList.city_list;


                //     for (let x in city_list) {

                //         if (city_list[x].indexOf(city) >= 0) {
                //             value = x;
                //             this.title = city_list[x];
                //             break;
                //         }

                //     }
                //     this.active = value;

                // });

            } else {
                this.title = '';
            }
        },
        getLabel() {

            if (this.title.length <= 0) {

                if (this.getLocation().length >= 3) {
                    return this.getLocation()[2].name;
                } else {
                    return '选择地址';
                }
            } else {

                return this.title;
            }
        }
    },
    computed: {
        label() {
            if (this.title.length <= 0) {
                if (this.getLocation().length >= 3) {
                    return this.getLocation()[2].name;
                } else {
                    return '选择地址';
                }
            } else {
                return this.title;
            }
        }
    },
    //过滤器
    filters: {},
    mounted() {
        // this.clear();
        this.update();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: { AddressEdit },
    watch: {}
};