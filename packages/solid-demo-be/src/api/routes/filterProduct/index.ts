import { Router } from "express";
import { ProductOption, ProductService } from "@medusajs/medusa";
import * as cors from "cors";

const router = Router();

router.get(
  "/store/product-filter",
  cors({ origin: "*", credentials: false }),
  (req, res) => {
    const productService: ProductService = req.scope.resolve("productService");
    productService
      .list(
        {},
        {
          relations: [
            "options",
            "options.values",
            "variants",
            "variants.prices",
            "categories",
          ],
        }
      )
      .then((data) => {
        let productFilter = data;
        const sizes =
          req.query.size && req.query.size?.toLocaleString().split(",");

        if (req.query.collectionId) {
          productFilter = productFilter.filter(
            (product) => product.collection_id === req.query.collectionId
          );
        }

        if (sizes && sizes.length) {
          productFilter = productFilter.filter((product) => {
            return product.options
              .find((option) => option.title === "Size")
              ?.values.find((value) => sizes.includes(value.value));
          });
        }

        const colors = req.query.color?.toLocaleString().split(",");
        if (colors && colors.length) {
          productFilter = productFilter.filter((product) => {
            return product.options
              .find((option) => option.title === "Color")
              ?.values.find((value) => colors.includes(value.value));
          });
        }

        if (req.query.sort) {
          switch (req.query.sort) {
            case "0":
              productFilter = productFilter.sort((prev, next) => {
                if (prev.title > next.title) return 1;
                if (prev.title < next.title) return -1;
                return 0;
              });
              break;
            case "1":
              productFilter = productFilter.sort((prev, next) => {
                if (prev.title < next.title) return 1;
                if (prev.title > next.title) return -1;
                return 0;
              });
              break;
            case "2":
              productFilter = productFilter.sort((prev, next) => {
                const prevPrice = prev.variants[0].prices[0].amount;
                const nextPrice = next.variants[0].prices[0].amount;
                if (prevPrice > nextPrice) return 1;
                if (prevPrice < nextPrice) return -1;
                return 0;
              });
              break;
            case "3":
              productFilter = productFilter.sort((prev, next) => {
                const prevPrice = prev.variants[0].prices[0].amount;
                const nextPrice = next.variants[0].prices[0].amount;
                if (prevPrice < nextPrice) return 1;
                if (prevPrice > nextPrice) return -1;
                return 0;
              });
              break;
            default:
              break;
          }
        }

        const limit = Number(req.query.limit) || 100;
        const offset = Number(req.query.offset) || 0;
        const from = offset * limit >= productFilter.length ? 0 : offset * limit;
        res.json({
          data: productFilter.slice(from, (offset + 1) * limit),
          limit: limit,
          offset: offset * limit > productFilter.length ? 0 : offset,
          count: productFilter.length,
        });
      })
      .catch(() => {});
  }
);

export default router;
