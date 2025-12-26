<?php
// products.php - Fetch Products API
require_once 'db.php';

try {
    // 1. Fetch Products
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll();

    // 2. Format data to match your frontend 'Product' interface
    // (Map SQL columns to JSON keys if they differ)
    $formattedProducts = array_map(function ($p) {
        return [
            "id" => $p['id'],
            "title" => $p['title'],
            "description" => $p['description'],
            "price" => (float) $p['price'],
            "originalPrice" => $p['originalPrice'] ? (float) $p['originalPrice'] : null,
            "image" => $p['image'],
            "categoryId" => (int) $p['category_id'],
            "sku" => $p['sku'],
            "stock" => (int) $p['stock'],
            "brand" => $p['brand'],
            "status" => $p['status']
        ];
    }, $products);

    // 3. Output JSON
    echo json_encode($formattedProducts);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>