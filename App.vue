<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id: '64d5cfcf99c624654370a358'
			}).then((res)=> {
				const {
					data
				} = res
				this.$store.dispatch('set_userinfo', data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/u-parse/u-parse.css';
</style>
