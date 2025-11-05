import { NextRequest, NextResponse } from "next/server";
import { blockForbiddenRequests, zodErrorHandler } from "@/utils/api";
import { AllowedRoutes } from "@/types";
import * as adminService from "../../services/admins";

const allowedRoles: AllowedRoutes = {
  GET: ["SUPER_ADMIN"],
};

export async function GET(request: NextRequest) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.GET);
    if (forbidden) {
      return forbidden;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    
    const skip = (page - 1) * limit;

    const result = await adminService.getAllUsersWithRoles({
      search,
      skip,
      take: limit,
    });
    
    return NextResponse.json(result);
  } catch (error) {
    return zodErrorHandler(error);
  }
}
