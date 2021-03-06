var ioc = {
	// 读取配置文件
	config : {
			type : "org.nutz.ioc.impl.PropertiesProxy",
			fields : { paths : [ "db.properties" ] } 
	},
	dataSource : {	
		type : "com.alibaba.druid.pool.DruidDataSource",
		fields : {
			driverClassName: { java : "$config.get('db-driver')" },
			url : { java : "$config.get('db-url')" },
			username : { java : "$config.get('db-username')" },
			password : { java : "$config.get('db-password')" },
		},
		events : {
			depose : "close"
		}
	},
	
	fileSqlManager:{
        type:"org.nutz.dao.impl.FileSqlManager",
        args:["sql"]
    },
	dao : {
		type : "org.nutz.dao.impl.NutDao",
		args : [{refer : "dataSource"},
		        {
		            refer : "fileSqlManager"
		        }]
	},
	
};