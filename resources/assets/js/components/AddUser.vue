<template>
    <div class="modal fade add-user-modal" role="dialog">
    <div class="modal-dialog modal-md add-user-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><i class="fa fa-address-book"></i> Add New User</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="addEditUser">
                    <div v-bind:class="{'form-group': true, 'focused':user.username, 'has-error has-danger': errors.username }">
                        <label>Username</label>
                        <input type="text" class="form-control" v-model="user.username">
                        <span class="help-block" v-for="(error, key) in errors.username">{{ error }}</span>
                    </div>
                    <div v-bind:class="{'form-group': true, 'focused':user.firstname, 'has-error has-danger': errors.firstname }">
                        <label>First Name:</label>
                        <input type="text" class="form-control" v-model="user.firstname">
                        <span class="help-block" v-for="(error, key) in errors.firstname">{{ error }}</span>
                    </div>
                    <div v-bind:class="{'form-group': true, 'focused':user.lastname, 'has-error has-danger': errors.lastname }">
                        <label>Last Name:</label>
                        <input type="text" class="form-control" v-model="user.lastname">
                        <span class="help-block" v-for="(error, key) in errors.lastname">{{ error }}</span>
                    </div>
                    <div v-bind:class="{'form-group': true, 'focused':user.password, 'has-error has-danger': errors.password }">
                        <label>Password:</label>
                        <input type="text" class="form-control" v-model="user.password">
                        <span class="help-block" v-for="(error, key) in errors.password">{{ error }}</span>
                    </div>
                    <div class="row" style="text-align:center">
                        <div class="col-md-12">
                            <button class="btn btn-success">SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import {showErrorMsg, showSuccessMsg} from '../helpers/helper';
    export default {
        props:['user'],
        data(){
            return{
                errors: {}
            }
        },
        methods: {
            addEditUser:function(){
                if(this.user.new){
                     this.addUser();
                } else {
                    this.updateUser();
                }
             },
             updateUser: function(){
                 this.$http.put('/api/users/'+this.user.id,this.user).then((res) => {
                     if (res.data.success) {
                         showSuccessMsg('User has been successfully updated!');
                         this.$root.$emit("refresh-datatable",true);
                         $('.add-user-modal').modal('hide');
                    }
                 }, response=>{
                    this.errors = response.data.errors;
                    $.toast({
                        heading: 'ERROR!',
                        text: "Kindly fix fields with error.",
                        position: 'top-right',
                        loaderBg:'#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                  });
             },
             addUser: function(){
                 this.$http.post('/api/users',this.user).then((res) => {
                      if (res.data.success) {
                      //this.$parent.$emit('add_user', id);
                      //this.records.splice(index, 1);
                      showSuccessMsg('User has been successfully added!');
                      this.$root.$emit("refresh-datatable",true);
                      $('.add-user-modal').modal('hide');
                      }
                  }, response=>{
                      this.errors = response.data.errors;
                      $.toast({
                          heading: 'ERROR!',
                          text: "Kindly fix fields with error.",
                          position: 'top-right',
                          loaderBg:'#ff6849',
                          icon: 'error',
                          hideAfter: 3500
                      });
                  });
             }
        }
    }
</script>