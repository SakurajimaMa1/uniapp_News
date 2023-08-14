export default function $http(options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id: '64d5cfcf99c624654370a358',
		...data
	}
	
	return new Promise((resolve, reject)=>{
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res)=>{
			if (res.result.code === 200) {
				resolve(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err)=>{
			reject(err)
		})
	})
}