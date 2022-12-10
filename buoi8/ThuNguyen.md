PHÂN BIỆT var, let, const TRONG JS

*var: 
-Khai báo được dùng được phạm vi toàn cục(global), hàm (function)
-Biến var có thể được cập nhật và khai báo lại (trong phạm vi tồn tại)
-Biến var được khởi tạo giá trị với undefined, có thể khai báo không khởi tạo giá trị 

*let và const
-Khai báo được định phạm vi là khối mã(block)
-Không được khởi gán giá trị
-let: có thể cập nhật nhưng không thể khai báo lại; có thể khai báo không khởi gán giá trị 
-const: không thể cập nhật và không thể khai báo lại; khai báo phải khởi gán giá trị 

TOÁN TỬ
*Toán tử gán:
Toán tử 	Ví dụ		Ý nghĩa
  =	      	x = y	     gán giá trị y cho x
  +=		x += y	     cộng thêm giá trị y cho x
  -=		x -= y	     trừ đi một giá trị y từ x
  *=		x *= y
  /=		x /= y
  %=		x %= y
  ??=           x ??= y	     phép gán khi bằng null (nếu x nhận giá trị null, x = y; 
			     nếu x nhận giá trị khác null, phép gán không thực hiện)

*Toán tử so sánh: 
==  : return true nếu 2 toán hạng bằng nhau
!+  : return true nếu 2 toán hạng khác nhau
>   : return true nếu toán hạng bên trái lớn hơn toán hạng bên phải 
<   : return true nếu toán hạng bên trái nhỏ hơn toán hạng bên phải 
>=  : return true nếu toán hạng bên trái lớn hơn hoặc bằng toán hạng bên phải 
<=  : return true nếu toán hạng bên trái nhỏ hơn hoặc bằng toán hạng bên phải 

*Toán tử logic: 
&&  : và
||  : hoặc
!   : phủ định

CÂU LỆNH ĐIỀU KIỆN

* Lệnh If..else...
if ( <biểu thức điều kiện> ){
	//Các câu lệnh với điều kiện đúng
}
else{
	//Các câu lệnh với điều kiện sai
}
* Lệnh Switch case
switch (<biến điều khiển>) {
case “nhãn 1”:
 	//Các câu lệnh với nhãn 1;
	break;
//Chú ý: Ký tự { và } được sử dụng để tách các khối mã.
case nhãn 2:
 	//Các câu lệnh với nhãn 2;
 	break;
…………
default:
 	//Các câu lệnh trong trường hợp mặc định;
}