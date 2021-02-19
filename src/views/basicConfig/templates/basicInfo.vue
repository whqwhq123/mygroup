<template>
    <div class="drawerContent">

        <div class="content_item">
            <div class="infoTit">基本信息</div>
            <ul class="info_ul">
                <li class="info_li">
                    <div class="li_tit">姓名</div>
                    <div class="li_content">{{info['userName']}}</div>
                </li>
                <li class="info_li">
                    <div class="li_tit">性别</div>
                    <div class="li_content">
                        <template v-if="info['userSex']">
                            {{info['userSex'] == 1 ? '男' : '女'}}
                        </template>
                        <template v-else>
                            -
                        </template>
                    </div>
                </li>
                <li class="info_li">
                    <div class="li_tit">手机号</div>
                    <div class="li_content">{{info['userPhone']}}</div>
                </li>
                <li class="info_li textBlue">
                    <div class="li_tit">所属部门</div>
                    <div class="li_content">{{info['deptName']}}</div>
                </li>
                <li class="info_li textBlue">
                    <div class="li_tit">兼职部门</div>
                    <div class="li_content">
                        <ol class="partTimeJob_ol">
                            <li class="partTimeJob_li" v-for="value in info['ucDeptUsers']" :key="value">{{value['deptName']}}</li>
                        </ol>
                    </div>
                </li>
                <li class="info_li textBlue">
                    <div class="li_tit">角色</div>
                    <div class="li_content">
                        <template v-for="value in info['ucRoleUsers']">
                            <template v-if="index > 0">、</template>
                            {{value['roleName']}}
                        </template>
                    </div>
                </li>
                <li class="info_li textBlue">
                    <div class="li_tit">负责品牌</div>
                    <div class="li_content">
                        <template v-for="(value,index) in info['ucUserBrands']">
                        <template v-if="index > 0">、</template>
                        {{value['brandName']}}
                        </template>
                    </div>
    
                </li>
            </ul>
        </div>
        <div class="content_item">
            <div class="infoTit">人事信息</div>
            <ul class="info_ul">
                <li class="info_li"><div class="li_tit">工号</div><div cla>{{info['userCode']}}</div></li>
                <li class="info_li"><div class="li_tit">入职时间</div><div class="li_content">{{info['entryTimeStr'] ? info['entryTimeStr'].substr(0,16) : ''}}</div></li>
                <li class="info_li"><div class="li_tit">职位</div><div class="li_content">{{info['userPosition']}}</div></li>
                <li class="info_li"><div class="li_tit">职级</div><div class="li_content">{{info['userLevel'] ? info['userLevel'] : '-'}}</div></li>
                <li class="info_li"><div class="li_tit">是否在职</div><div class="li_content">{{info['positionStatus'] == 1 ? '在职' : '离职'}}</div></li>
            </ul>
        </div>
        <div class="content_item">
            <div class="infoTit">备注信息</div>
            <div class="info_ul">
                {{info['userRemark'] ? info['userRemark'] : '-'}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        info: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.drawerContent{
    width: 100%;
    padding: 0 60px 20px 60px;
    box-sizing: border-box;

    .content_item {
        font-size: 16px;
        font-weight: 400;
        font-family: Source Han Sans CN;
        color: #4D4F5C;

        .infoTit {
            font-weight: bold;
            padding: 25px 0 20px 0;
        }

        .info_ul {
            padding: 0;
            margin: 0;

            .info_li {
                width: 100%;
                margin-bottom: 15px;
                display: flex;
                display: -webkit-flex;
                display: -webkit-inline-flex;

                .li_tit {
                    display: inline-block;
                    width: 70px;
                    color: rgba($color: #4D4F5C, $alpha: 0.5);
                    margin-right: 20px;
                }

                .li_content {
                    flex: 1;
                }

                .partTimeJob_ol {
                    padding: 0;
                    margin: 0;

                    .partTimeJob_li {
                        margin-bottom: 4px;

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }

        .textBlue {
            color: #3B86FF;
        }
    }

}
</style>
