<template>
	<div class="reg-container">
		<div class="reg-box">
			<img
				:src="logoUrl"
				alt=""
				class="logo" />
			<el-form
				:model="formData"
				:rules="rules"
				ref="formContainer">
				<el-form-item prop="username">
					<el-input
						prefix-icon="el-icon-user"
						placeholder="请输入用户名"
						v-model="formData.username"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						prefix-icon="el-icon-lock"
						placeholder="请输入密码"
						type="password"
						show-password
						v-model="formData.password"></el-input>
				</el-form-item>
				<el-form-item prop="repassword">
					<el-input
						prefix-icon="el-icon-lock"
						placeholder="请确认密码"
						type="password"
						show-password
						v-model="formData.repassword"></el-input>
				</el-form-item>

				<el-form-item>
					<div class="button-container">
						<el-button
							round
							type="primary"
							size="medium"
							@click="handleReg"
							>注册</el-button
						>
						<el-button
							size="medium"
							@click="handleClick"
							round
							>登录</el-button
						>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import logoUrl from "@/assets/logo.png"
	import reg from "@/api/reg"
	export default {
		data() {
			let validatePass = (rule, value, callback) => {
				if (value !== this.formData.password) {
					callback(new Error("两次输入密码不一致!"))
				} else {
					callback()
				}
			}
			return {
				logoUrl,
				formData: {
					username: "",
					password: "",
					repassword: "",
				},
				rules: {
					username: [
						// trigger 触发时机 blur -> 失去焦点
						{ required: true, message: "用户名必填", trigger: "blur" },
						{
							pattern: /^[a-zA-Z0-9]{1,10}$/,
							message: "用户名必须是1~10的字母或数字",
							trigger: "blur",
						},
					],
					password: [
						{ required: true, message: "密码必填", trigger: "blur" },
						{
							pattern: /^\S{6,15}$/,
							message: "密码必须是6-15位非空格字符",
							trigger: "blur",
						},
					],
					repassword: [
						{ required: true, message: "确认密码必填", trigger: "blur" },
						{
							pattern: /^\S{6,15}$/,
							message: "密码必须是6-15位非空格字符",
							trigger: "blur",
						},
						{ validator: validatePass, trigger: "blur" },
					],
				},
			}
		},
		methods: {
			handleReg() {
				this.$refs.formContainer.validate(async (valid) => {
					if (!valid) {
						// 兜底校验不通过
						return false
					}
					const resp = await reg(this.formData)

					if (resp.code !== 0) {
						this.$message.error(resp.message)
						this.formData.username = ""
						return
					}
					this.$message.success(resp.message)
					this.$router.push({ name: "Login" })
				})
			},
			handleClick() {
				this.$router.push({ name: "Login" })
			},
		},
	}
</script>

<style lang="less" scoped>
	@import "~@/styles/var.less";
	.reg-container {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		.reg-box {
			width: 300px;
			background: @ligth;
			padding: 20px 35px;
			border-radius: 32px;
			box-shadow: transparent 0px 0px 0px 2px inset;
			gap: 20px;
			.logo {
				display: block;
				width: 70px;
				margin: 20px auto;
			}
			.button-container {
				text-align: center;
			}
		}
	}
</style>
