
//% color="#18ae66" iconWidth=50 iconHeight=40
namespace pyemail {

    //% block="Initialized email sending service sender mailbox [FMAIL] recipient mailbox [TMAIL]" blockType="command"
    //% FMAIL.shadow="string" FMAIL.defl=" " 
    //% TMAIL.shadow="string" TMAIL.defl=" "
    export function setMail(parameter: any, block: any) {
        let fmail = parameter.FMAIL.code;
        let tmail = parameter.TMAIL.code;
        Generator.addImport("import smtplib");
        Generator.addImport("from email.mime.text import MIMEText");
        Generator.addImport("from email.utils import formataddr");
        Generator.addDeclaration(`mailaddress`,`sender_mail = ${fmail}
recipient_mail = ${tmail}
`);
    }
    
    //% block="Set the mailbox server authorization code [ACC] IMAP server [SERVER] port [PORT]" blockType="command"
    //% SERVER.shadow="string" SERVER.defl="smtp.qq.com" 
    //% PORT.shadow="string" PORT.defl="465" 
    //% ACC.shadow="string" ACC.defl=" "  
    export function setServer(parameter: any, block: any) {
        let server = parameter.SERVER.code;
        let port = parameter.PORT.code;
        let acc = parameter.ACC.code;

        port = replaceQuotationMarks(port)

        Generator.addImport("import smtplib");
        Generator.addImport("from email.mime.text import MIMEText");
        Generator.addImport("from email.utils import formataddr");

        Generator.addDeclaration(`mailfunction`,`# 定义邮件发送函数
def smtp_send_mail(title,content):
    global sender_mail,recipient_mail
    ret=True 
    try:
        msg=MIMEText(content,'plain','utf-8')  
        msg['From']=formataddr([sender_mail,sender_mail]) 
        msg['To']=formataddr([recipient_mail,recipient_mail]) 
        msg['Subject']=title 

        # 创建SMTP服务
        server=smtplib.SMTP_SSL(${server}, ${port}) 
        server.login(sender_mail, ${acc})  
        server.sendmail(sender_mail,recipient_mail,msg.as_string())  
        server.quit()  
        print("send e-mail successfully!")
    except Exception as e:  
        print("send e-mail error!")
        ret=False 
        print(str(e))
    return ret 
`);        
 
    }
    //% block="send mail title:[TITLE] message:[MESS]" blockType="command"
    //% TITLE.shadow="string" TITLE.defl=" " 
    //% MESS.shadow="string" MESS.defl=" " 
    export function sendmail(parameter: any, block: any) {
        let title = parameter.TITLE.code;
        let mess = parameter.MESS.code;
        Generator.addCode(`smtp_send_mail(${title},${mess})`);
 
    }
    function replaceQuotationMarks(str:string){
        str=str.replace(/"/g, ""); //去除所有引号
        return str
    }   
}
