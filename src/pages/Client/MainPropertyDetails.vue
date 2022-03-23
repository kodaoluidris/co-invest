<template>
    <Content>
        <div class="details-banner">
            <div class="wrapper">
                <div>
                    <div class="row">
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-2.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-2.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-4.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-5.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- details -->
        <div class="container-fluid contain">
            <div class="row">
                <div class="col-lg-8">
                    <div class="pd-text">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="pd-title">
                                    <!-- <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
                                    <div class="label">For rent</div> -->
                                    <div class="pt-price" v-if="data.name">₦ {{data.price.toLocaleString()}}</div>
                                    <h3>{{data.name}}</h3>
                                    <p><span class=",mdi mdi-map-marker-outline"></span> 3 Middle Winchendon Rd, Rindge, NH 03463</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="pd-social">
                                    <button class="d-none btn-special btn-lg">BUY NOW</button>
                                </div>
                            </div>
                        </div>
                        <div class="pd-board">
                            <div class="tab-board">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Overview</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Description</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Amenities</a>
                                    </li> -->
                                </ul><!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="tab-details">
                                            <ul class="left-table">
                                                <li>
                                                    <span class="type-name">Property Type</span>
                                                    <span class="type-value">{{data.pt_name}}</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Property ID</span>
                                                    <span class="type-value">#219</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Price</span>
                                                    <span class="type-value" v-if="data.price">$ {{data.price.toLocaleString()}}</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">No of groups</span>
                                                    <span class="type-value">{{data.groups}}</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Status</span>
                                                    <span class="type-value">{{data.status}}</span>
                                                </li>
                                            </ul>
                                             <ul class="right-table" v-if="data.more_infos != null">
                                                <li v-for="(m, i) in data.more_infos" :key="i">
                                                    <span class="type-name">{{m.name}}</span>
                                                    <span class="type-value">{{m.value}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                                        <div class="tab-desc">
                                            <div v-html="data.description">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-3" role="tabpanel">
                                        <div class="tab-details">
                                            <ul class="left-table">
                                                <li>
                                                    <span class="type-name">Property Type</span>
                                                    <span class="type-value">House</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Property ID</span>
                                                    <span class="type-value">#219</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Price</span>
                                                    <span class="type-value">$ 289.0/mounth</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Year Built</span>
                                                    <span class="type-value">2019</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Contract type</span>
                                                    <span class="type-value">Rent</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Agent</span>
                                                    <span class="type-value">Ashton Kutcher</span>
                                                </li>
                                            </ul>
                                            <ul class="right-table">
                                                <li>
                                                    <span class="type-name">Home Area</span>
                                                    <span class="type-value">1200 sqft</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Rooms</span>
                                                    <span class="type-value">9</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Bedrooms</span>
                                                    <span class="type-value">4</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Bathrooms</span>
                                                    <span class="type-value">3</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Garages</span>
                                                    <span class="type-value">2</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Parking lots</span>
                                                    <span class="type-value">2</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="property-sidebar scroll-area-xl">
                        <div class="single-sidebar">
                            <div class="section-title sidebar-title">
                                <h5>No of Groups ({{data.all_groups.length}})</h5>
                            </div>
                            <div class="top-agent pr-1" v-if="data.all_groups.length">
                                <div class="ta-item" v-for="(g,i) in data.all_groups" :key="i">
                                    <b-link :to="{name:'MainPropertyGroupDetails', params:{mainGroupPropertyId: g.id}}" target="_blank">
                                        <div class="ta-pic set-bg"  :style="`background-image: url(&quot;${data.image[0].image}&quot;);`"></div>
                                        <div class="ta-text">
                                            <h6><a href="#">Group {{ i + 1}}</a>  <span v-if="g.group_open" class="float-right badge d-inline text-white " style="background:#00C89E">Open</span>
                                            <span v-else class="float-right badge d-inline text-white badge-primary">Closed</span></h6>
                                            <span>Slot <b>{{g.no_of_people}}</b> &nbsp; &nbsp; Available <b>{{g.no_of_people - g.no_of_people_reg}}</b></span>
                                            <div class="ta-num mb-2">
                                                Price ₦{{g.group_price.toLocaleString()}}
                                            </div>
                                        
                                        </div>

                                    </b-link>
                                </div>
                            </div>
                            <div v-else class="alert alert-info shadow-sm">
                                No group has been attached to this property
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  End of details-->
    </Content>
</template>

<script>
import Content from '@/pages/Client/Layout/Content'
import axios from "axios";
export default {
    components: {
        Content
    },
    data(){return {
        data:{},
    }},
    mounted(){
        this.fetchData(parseInt(this.$route.params.mainPropertyId));
    },
    methods: {
        fetchData(id){
            axios.get(this.dynamic_route(`/client/single-main-property/${id}`))
            .then(res => {
                if(res.status) {
                    this.data = res.data.data

                }
            }).catch(() => {

            })
        }
    }
}
</script>
<style scoped>
a:hover {
    text-decoration: none !important;
}
.wrapper {
    padding: 5.9rem 0;
}
.pd-text .pd-title {
    position: relative;
    margin-bottom: 65px;
}
.pd-text .pd-title .pt-price {
    font-size: 20px;
    font-weight: 700;
    color: #00C89E;
    margin-bottom: 10px;
    display: inline-block;
}
.pd-text .pd-title .pt-price span {
    font-size: 14px;
    color: #666666;
    font-weight: 400;
}
.pd-text .pd-title h3 {
    margin-bottom: 6px;
    font-weight: 700;
    color: #111111;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
    font-size: 30px;
}
.pd-text .pd-title p {
    font-weight: 500;
}
.pd-text .pd-title p span {
    color: #00C89E;
}
.pd-text .pd-social {
    text-align: right;
    padding-top: 40px;
    margin-bottom: 30px;
}
.btn-special {
    height: 50px;
    width: 150px;
    background: #00C89E;
    color: #ffffff;
    font-size: 18px;
}
.btn-special:hover {
    background: #06a784;
}
.pd-text .pd-board {
    margin-bottom: 65px;
}
.pd-text .pd-board .tab-board .nav-tabs {
    background: #113220;
    border-bottom: none;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item {
    margin-bottom: 0;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item a.active {
    color: #ffffff;
    background: #00C89E;
    border-top-right-radius: 0 !important;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item a {
    font-size: 17px;
    color: #ffffff;
    display: inline-block;
    padding: 22px 32px;
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    font-weight: 700;
}
.pd-text .pd-board .tab-board .tab-content .tab-details {
    border: 1px solid #e1e1e1;
    overflow: hidden;
    border-top: none;
}
ul, ol {
    padding: 0;
    margin: 0;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul {
    width: 50%;
    float: left;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li {
    font-size: 15px;
    list-style: none;
    font-weight: 500;
    color: #000000;
    padding: 18px 0;
    padding-left: 30px;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul.left-table li:nth-child(even) {
    background: #f7f7f7;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li .type-name {
    color: #111111;
    width: 148px;
    display: inline-block;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li .type-value {
    color: #00C89E;
    display: inline-block;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul.right-table li:nth-child(odd) {
    background: #f7f7f7;
}
.property-sidebar .single-sidebar {
    margin-bottom: 68px;
}
.section-title.sidebar-title {
    margin-bottom: 36px;
}
.section-title.sidebar-title h5 {
    font-family: "Lato", sans-serif;
}
.section-title h4, .section-title h5, .section-title h6 {
    color: #111111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 20px;
}
.section-title.sidebar-title h5:after {
    height: 36px;
    top: -8px;
}
.section-title h4:after, .section-title h5:after, .section-title h6:after {
    position: absolute;
    left: 0;
    /* top: -9px; */
    width: 5px;
    /* height: 46px; */
    background: #00C89E;
    content: "";
}
.property-sidebar .single-sidebar .top-agent .ta-item {
    overflow: hidden;
    margin-bottom: 30px;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-pic {
    height: 130px;
    width: 130px;
    float: left;
}
.set-bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-text {
    overflow: hidden;
    border: 1px solid #ebebeb;
    border-left: none;
    height: 130px;
    padding-top: 26px;
    padding-left: 20px;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-text h6 {
    margin-bottom: 8px;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-text h6 a {
    color: #111111;
    font-weight: 700;
    text-transform: uppercase;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-text span {
    font-size: 14px;
    color: #888888;
    display: block;
    margin-bottom: 8px;
}
.property-sidebar .single-sidebar .top-agent .ta-item .ta-text .ta-num {
    font-size: 14px;
    color: #00C89E;
    font-weight: 500;
}
.pd-text .pd-board .tab-board .tab-content .tab-desc {
    border: 1px solid #e1e1e1;
    overflow: hidden;
    border-top: none;
    padding: 22px 20px;
}
.pd-text .pd-board .tab-board .tab-content .tab-desc p {
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    color: #666666;
    font-weight: 400;
    line-height: 24px;
    margin: 0 0 15px 0;
}
.tab-content > .tab-pane {
    padding: 0 !important;
}
.scrollable-element {
  scrollbar-width: thin;
}
</style>