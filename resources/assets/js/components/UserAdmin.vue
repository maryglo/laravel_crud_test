<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">User Admin</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <a href="javascript:void(0)" class="btn btn-primary pull-right" style="float: right;" @click="showAddUser"><i class="fa fa-plus"></i> Add User</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="datatable-content" style="margin-top:20px;">
                                    <!--<table class="table table-striped">
                                        <thead>
                                        <th>User ID</th>
                                        <th>Username</th>
                                        <th>First</th>
                                        <th>Last</th>
                                        <th>Actions</th>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(record, index) in records">
                                            <td>{{ record.id}}</td>
                                            <td>{{ record.username}}</td>
                                            <td>{{ record.firstname}}</td>
                                            <td>{{ record.lastname}}</td>
                                            <td><a @click="editUser(record.id,index)" href="javascript:void(0)" title="Edit" class=""><i class="fa fa-edit "></i></a> | <a @click="removeUser(record.id,index)" href="javascript:void(0)" title="Delete" class=""><i class="fa fa-trash"></i></a></td>
                                        </tr>
                                        </tbody>
                                    </table>-->
                                    <v-client-table :data="tableData" :columns="columns" :options="options" ref="table">
                                        <div slot="actions" slot-scope="props">
                                          <a href="javascript:void(0)" title="Edit" class="fa fa-edit" @click="editUser(props.row.id,props.index)"></a><span> | </span>
                                          <a @click="removeUser(props.row.id,props.index)" href="javascript:void(0)" title="Delete" class=""><i class="fa fa-trash"></i></a>
                                        </div>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <add-user-modal v-bind:user="user"></add-user-modal>
    </div>

</template>
<script>
    import {showSuccessMsg} from '../helpers/helper';
    import AddUserModal from './AddUser.vue';
    import {ServerTable, ClientTable, Event} from 'vue-tables-2';

    export default {
        mounted() {
            console.log('Component mounted.')
            window.Vue.use(ClientTable, [{
                compileTemplates: true,
                filterByColumn: true,
                pagination: {
                    dropdown:true,
                    chunk:5
                }
            }]);
        },
        components:{
            'add-user-modal': AddUserModal,ClientTable
        },
        data(){
            return{
                records: [],
                loadingDatatable: false,
                user:{},
                columns: ['id','username', 'firstname', 'lastname','actions'],
                options:{
                    headings: {
                        id: 'User ID',
                        username: 'User Name',
                        firstname: 'First',
                        lastname: 'Last',
                        actions: 'Actions'
                    },
                    filterable: []
                },
                tableData: []
            }
        },
        created() {
            this.getRecords();
            this.$root.$on('refresh-datatable', data => {
                this.getRecords();
            });
        },
        methods: {
            getRecords: function () {
                this.loadingDatatable = true;
                this.$http.get('/api/users')
                        .then((response) => {
                    if (response.data.users.length) {
                         this.records = response.data.users;
                         this.tableData = this.records;
                    } else {
                        this.records = [];
                    }
                }).catch(response => {
                    showErrorMsg('something went wrong to load the data table!!!');
                });

            },
            removeUser: function(id, index){
                if (!confirm("Are you sure you want to delete the user?")) {
                    return;
                }

                this.$http.delete('/api/users/'+id,[]).then((res) => {
                    if (res.data.success) {
                      this.$parent.$emit('remove_user', id);
                      this.records.splice(index - 1, 1);
                      this.tableData.splice(index - 1, 1);
                      this.$emit("refresh-datatable",true);
                      showSuccessMsg('User has been successfully deleted!');
                    }
                }).catch((err) => {
                    //showErrorMsg(err.data.message);
                });
            },
            showAddUser: function() {
                this.user = {};
                this.user.new = true;
                $(".add-user-modal").modal('show');
            },
            editUser: function(id,index){
                this.user = this.records[index - 1];
                this.user.new = false;
                $(".add-user-modal").modal('show');
            }

        }
    }
</script>
