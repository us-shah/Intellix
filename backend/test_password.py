from app.auth.password import verify_password

hash_value = "$2b$12$BFeOX1WBsN5kVtvFsnCdS..IC8.OW.rU.M.CSUm15HX8/Cx3VmJHa"

print(verify_password("pass123", hash_value))