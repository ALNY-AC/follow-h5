// @ts-nocheck
import { AddressEdit } from "vant";

import area from "@/plugin/area.js";

export default {
    name: 'SelectAddress',
    props: {
        value: {
            type: String,
            default: ''
        }
        ,
        list: {
            type: Array,
            default: ''
        }
    },
    data() {
        return {
            //地址数据
            areaList: area,
            //当前选中的收货地址id
            chosenContactId: null,
            //地址的编辑数据
            editingContact: {},
            //是否显示收货地址列表
            showAddressList: false,
            //地址列表
            addressList: [],
            //是否显示编辑
            showEdit: false,
            id_card: '',
        };
    },
    methods: {
        getValue() {
            return this.currentContact;
        },
        update(fun) {
            // let 
            // this.addressList = [];
            this.$get("address/getList", {}, res => {

                if (res.res > 0) {
                    this.addressList = this.buliderAddressList(res.msg);
                    this.$emit('update:list', this.addressList);
                    setTimeout(() => {
                        this.$emit('input', this.chosenContactId);
                        this.$emit('on-select');
                    }, 100)
                }

                this.$nextTick(() => {
                    if (fun) {
                        fun()
                    }
                })

                if (res.res == 0) {

                    this.$dialog.confirm({
                        title: '提示',
                        message: '您还没有收货地址，请添加~'
                    }).then(() => {
                        this.showAddressList = true;
                    }).catch(() => {
                        this.$back(-1);
                    });

                }

            });
        },
        buliderAddressList(list) {
            if (!list) {
                return [];
            }
            list.forEach(item => {
                item.id = item.address_id;
                item.is_default = item.is_default == 1;
                if (item.is_default) {
                    this.chosenContactId = item.address_id;
                }
            });
            return list;
        },
        //添加收货人
        onAdd() {
            this.editingContact = null;
            this.id_card = '';
            this.isEdit = false;
            this.showEdit = true;
        },
        // 编辑联系人
        onEdit(item) {
            this.isEdit = true;
            this.showEdit = true;
            this.editingContact = item;
            this.id_card = item.id_card;
        },
        // 选中联系人
        onSelect() {
            this.showAddressList = false;
            this.$emit('input', this.chosenContactId);
            this.$emit('on-select');
        },
        // 保存联系人
        onSave(info) {
            // this.$loading();

            if (info.id_card.length < 18) {
                this.$toast("您的身份证号不正确");
            }

            info.name = info.name.replace(/\s+/g, " ");

            if (this.isEdit) {
                //保存
                this.$post(
                    "address/save",
                    { address_id: info.address_id, save: info },
                    res => {

                        this.showEdit = false;
                        this.$clearLoading();
                        if (res.res >= 1) {
                            this.$toast.success("保存成功");

                        }

                        if (res.res < 0) {
                            this.$toast.fail("保存失败！请重试~");
                        }
                        this.update(() => {
                            this.chosenContactId = info.address_id;
                            this.$emit('input', this.chosenContactId);
                            this.$emit('update:list', this.addressList);
                            this.$emit('on-select');
                        });

                    }
                );
            } else {
                //新增
                this.$post("address/add", { add: info }, res => {
                    this.showEdit = false;
                    this.$clearLoading();
                    if (res.res >= 1) {
                        this.$toast.success("添加成功~");

                        this.update(() => {

                            this.chosenContactId = res.msg.address_id;
                            this.$emit('input', this.chosenContactId);
                            this.$emit('update:list', this.addressList);
                            this.$emit('on-select');
                        });


                    }

                });
            }
        },
        // 删除联系人
        onDelete(info) {
            this.$loading();
            this.$post(
                "address/del",
                {
                    address_id: info.address_id
                },
                res => {
                    this.$clearLoading();
                    this.showEdit = false;
                    if (res.res >= 1) {
                        this.$toast("删除成功");
                        this.addressList = this.addressList.filter(
                            item => item.address_id !== info.address_id
                        );
                        if (this.chosenContactId === info.address_id) {
                            this.chosenContactId = null;
                        }
                    }
                    if (res.res < 1) {
                        this.$toast("删除失败！请重试~");
                    }
                    this.$emit('input', this.chosenContactId);
                    this.$emit('update:list', this.addressList);
                    this.$emit('on-select');

                }
            );
        },
    },
    computed: {
        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        },
        currentContact() {
            const address_id = this.chosenContactId;
            return address_id !== null
                ? this.addressList.filter(item => item.address_id === address_id)[0]
                : {};
        },
    },
    //过滤器
    filters: {},
    mounted() {
        this.update();
        this.$nextTick(() => { })
    },
    //Vue 实例销毁后调用
    destroyed() { },
    components: {
        [AddressEdit.name]: AddressEdit,
    },
    watch: {
        addressList(val) {
            this.$emit('input', this.chosenContactId);
            this.$emit('update:list', this.addressList);
            this.$emit('on-select');
        }
    }
};