import dayjs from 'dayjs'

/**
 * 当前时间
 * @returns 
 */
export const Now = () => {
	return dayjs();
}

/**
 * 时间戳转化为时间   
 * @param Timestamp 
 * @returns 
 */
export const timestamp2time = (Timestamp: any) => {
	let date1 = new Date(Timestamp);
	return date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8); 
}
