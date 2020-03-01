<template>
<div class="hello">
    <p>
        axios网络请求http利器
    </p>
    <ul>
        <li>
            <button @click="trriger_get">get请求</button>
        </li>
        <li>
            <button @click="trriger_post">post请求</button>
        </li>
        <li>
            <button @click="concurrent_post">并行请求</button>
        </li>
    </ul>
    <div class="editor-container" v-if="value">
        <json-editor ref="jsonEditor" v-model="value" />
    </div>
</div>
</template>

<script>
// 可用接口
// http://testapi.yueqizhixiang.com/api/seller/list
// {keyword:'',bigClassId :34}

// http://testapi.yueqizhixiang.com/api/seller/getAllClass 获取分类
import jsonEditor from './jsonEditor'
import axios from 'axios'
import {
    get,
    post
} from './../plugins/request/index'
const sellerList = 'seller/list'

export default {
    name: 'HelloWorld',
    components: {
        jsonEditor
    },
    props: {
        msg: String
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        concurrent_post() {
            function getAllClass() {
                return get('seller/getAllClass');
            }

            function getSellerList() {
                return get(sellerList + '?bigClassId=34');
            }
            axios.all([getAllClass(), getSellerList()]).then(axios.spread((getAllClass, getSellerList) => {
                console.log('getAllClass', getAllClass)
                console.log('getSellerList', getSellerList)
            }));
        },
        trriger_post() {
            post('seller/addSearchKeyword', {
                keyword: '测试'
            }).then(response => {
                this.value = response;
            }).catch(error => {
                console.log(error)
                this.value = error
            })
        },
        async trriger_get_asnyc() {
            try {
                console.log('trriger_get_asnyc');
                const response = await get(sellerList, {
                    bigClassId: 34,
                    currentPage: 1,
                    pageSize: 30
                })
                this.value = response;
            } catch (err) {
                console.error(err);
                this.value = err;
            }
        },
        trriger_get() {
             get(sellerList, {
                // cancelToken: new CancelToken(function executor(c) {
                //     // An executor function receives a cancel function as a parameter
                //     cancel = c;
                // }),
                bigClassId: 34,
                currentPage: 1,
                pageSize: 20
            }).then(response => {
                this.value = response;
            });
            get(sellerList, {
                // cancelToken: new CancelToken(function executor(c) {
                //     // An executor function receives a cancel function as a parameter
                //     cancel = c;
                // }),
                bigClassId: 34,
                currentPage: 1,
                pageSize: 20
            }).then(response => {
                this.value = response;
            });
            // cancel the request (the message parameter is optional)
            // cancel('s');
        }
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.editor-container {
    position: relative;
    height: 100%;
}
</style>
