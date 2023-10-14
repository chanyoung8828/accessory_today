import { Router } from "express";
import { categoryService } from "../services/categoryService.js";
import { hash } from "bcrypt";

const categoryRouter = Router();

// 새 카테고리
categoryRouter.post("/categorys", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const { category } = req.body;
  try {
    // 카테고리 개설 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const newCategoryResult = await categoryService.newCategory(category);
    return res.json(newCategoryResult);
  } catch (err) {
    return res.json(err);
  }
});

//카테고리 삭제

categoryRouter.delete("/categorys", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const { category } = req.body;
  try {
    // 카테고리 개설 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const newCategoryResult = await categoryService.deleteCategory(category);
    return res.json(newCategoryResult);
  } catch (err) {
    return res.json(err);
  }
});

//전체 카테고리 조회

categoryRouter.get("/categorys", async (req, res) => {
  try {
    const allCategories = await categoryService.getAllCategories();
    return res.json(allCategories);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 카테고리 수정
categoryRouter.patch("/categorys/:categoryId", async (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const updatedCategory = req.body; // 수정된 카테고리 데이터

  try {
    const result = await categoryService.patchCategory(
      categoryId,
      updatedCategory
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { categoryRouter };
