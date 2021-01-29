<template>
    <div class="drawerContent">

        <div class="content_item">
            <div class="infoTit">基本信息</div>
            <ul class="info_ul">
                <li class="info_li"><span>姓名</span>{{info['userName']}}</li>
                <li class="info_li"><span>性别</span>
                  <template v-if="info['userSex']">
                    {{info['userSex'] == 1 ? '男' : '女'}}
                  </template>
                  <template v-else>
                    -
                  </template>
                </li>
                <li class="info_li"><span>手机号</span>{{info['userPhone']}}</li>
                <li class="info_li textBlue"><span>所属部门</span>{{info['deptName']}}</li>
                <li class="info_li textBlue">
                    <span>兼职部门</span>
                    <ol class="partTimeJob_ol">
                        <li class="partTimeJob_li" v-for="value in info['ucDeptUsers']">{{value['deptName']}}</li>
                    </ol>
                </li>
                <li class="info_li textBlue"><span>角色</span>
                  <template v-for="value in info['ucRoleUsers']">
                    <template v-if="index > 0">、</template>
                    {{value['roleName']}}
                  </template>
                </li>
                <li class="info_li textBlue"><span>负责品牌</span>
                <template v-for="(value,index) in info['ucUserBrands']">
                  <template v-if="index > 0">、</template>
                  {{value['brandName']}}
                </template>
                </li>
            </ul>
        </div>
        <div class="content_item">
            <div class="infoTit">人事信息</div>
            <ul class="info_ul">
                <li class="info_li"><span>工号</span>{{info['userCode']}}</li>
                <li class="info_li"><span>入职时间</span>{{info['entryTimeStr'].substr(0,16)}}</li>
                <li class="info_li"><span>职位</span>{{info['userPosition']}}</li>
                <li class="info_li"><span>职级</span>{{info['userLevel'] ? info['userLevel'] : '-'}}</li>
                <li class="info_li"><span>是否在职</span>{{info['positionStatus'] == 1 ? '在职' : '离职'}}</li>
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

                span {
                    display: inline-block;
                    width: 70px;
                    color: rgba($color: #4D4F5C, $alpha: 0.5);
                    margin-right: 20px;
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
