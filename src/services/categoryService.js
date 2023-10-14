import { categoryModel } from "../db/models/categoryModel.js";
import mongoose from "mongoose";


class CategoryService {
  // 새 카테고리 생성
  async newCategory(category) {
    // 중복되는 카테고리가 존재하는지 검사
    
    const categoryExsist = await categoryModel.findOne({ category: category });
    // 중복되는 카테고리가 있을 경우 이미 존재하는 카테고리라고 알리기

    if (categoryExsist) {
      return {
        status: 404,
        errMsg: "이미 존재하는 카테고리입니다.",
      };
    }
    // db에 저장하기
    await categoryModel.create({ category });
    // 성공 메시지와 새로 가입한 유저 정보 반환
    return {
      status: 201,
      message: "카테고리가 생성되었습니다",
    };
  }

  //카테고리 삭제

  async deleteCategory(category) {
    //중복되는 카테고리가 있는지 검사

    const categoryExsist = await categoryModel.find({ category: category });
    // 중복되는 카테고리가 있을 경우 존재하지 않는 카테고리라고 알리기

    if (categoryExsist.length === 0) {
      return {
        status: 400,
        errMsg: "존재하지 않는 카테고리입니다.",
      };
    }
    // db에서 삭제

    await categoryModel.deleteOne({ category: category });
    // 성공 메시지와 카테고리 삭제
    return {
      status: 200,
      message: "카테고리가 삭제되었습니다",
    };
  }

  //전체 카테고리 조회
  async getAllCategories() {
    const allCategories = await categoryModel.find({});
    return {
      status: 200,
      message: "카테고리 전체 목록입니다.",
      categories: allCategories,
    };
  }

  //카테고리 수정

  // 카테고리 수정
  async patchCategory(id, updatedCategory) {
    try {
      // Convert the id to ObjectId
      const categoryId = new ObjectId(id); // ObjectId형태로 변환

      // Check if the category exists
      // const categoryExsist = await categoryModel.findById(category); // id로 찾기
      // 중복되는 카테고리가 없을 경우 존재하지 않는 카테고리라고 알리기
      if (!categoryExsist) {
        return {
          status: 404,
          errMsg: "존재하지 않는 카테고리입니다.",
        };
      }

      // db에 저장하기
      await categoryModel.findOneAndUpdate(
        { _id: categoryId },
        updatedCategory
      );

      // 성공 메시지
      return {
        status: 200,
        message: "카테고리 정보를 수정했습니다",
      };
    } catch (error) {
      console.error("patchCategory 오류:", error);
      return {
        status: 500,
        message: "카테고리 수정 중에 오류가 발생했습니다.",
      };
    }
  }
}

const categoryService = new CategoryService();

export { categoryService };
