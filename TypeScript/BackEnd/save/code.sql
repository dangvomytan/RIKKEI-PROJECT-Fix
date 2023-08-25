SELECT p.id AS id, CONCAT(p.product_Name, ' - ', v.version_Name) AS product_Name, v.*
FROM tbl_products p
INNER JOIN tbl_versions v ON p.id = v.product_Id
WHERE v.id = (
    SELECT MIN(id)
    FROM tbl_versions
    WHERE product_Id = p.id
);

SELECT 
*
FROM tbl_products 
INNER JOIN tbl_versions  ON tbl_products.id = v.product_Id
WHERE v.id = (
    SELECT MIN(id)
    FROM tbl_versions
    WHERE product_Id = tbl_products.id
);