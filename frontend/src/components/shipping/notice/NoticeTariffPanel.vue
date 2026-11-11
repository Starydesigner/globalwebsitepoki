<script setup lang="ts">
import MgButton from "@/components/common/MgButton.vue";

defineOptions({ name: "NoticeTariffPanel" });
</script>

<template>
  <div
    class="notice-panel notice-panel--tariff"
    id="notice-panel-tariff"
    data-notice-panel="tariff"
    role="tabpanel"
    aria-labelledby="notice-tab-tariff"
    hidden
  >
    <div class="notice-tax-board">
      <form class="notice-tax" data-tax-form autocomplete="off">
        <div class="notice-tax__intro">
          <div class="notice-tax__field">
            <div class="notice-tax__search" data-tax-search>
              <input
                class="notice-tax__input"
                type="text"
                data-tax-input
                placeholder="输入税号或名称（名称支持模糊匹配，税号不支持）"
                aria-label="税号或品名"
                autocomplete="off"
                aria-describedby="notice-tax-field-error"
              />
              <button type="button" class="field-clear" data-tax-clear hidden>清空</button>
            </div>
            <p id="notice-tax-field-error" class="notice-tax__field-error" data-tax-field-error hidden role="alert" />
          </div>
          <p class="notice-tax__tip">
            本功能搜索信息仅供参考，详情请关注
            <a href="http://www.customs.gov.cn/" target="_blank" rel="noopener noreferrer">中华人民共和国海关总署官网</a>。
          </p>
        </div>
        <div class="notice-tax__actions">
          <MgButton type="submit" variant="filled" size="lg">查询</MgButton>
        </div>
      </form>
      <div class="notice-tax__result" data-tax-result hidden>
        <div class="notice-tax__result-card">
          <h3 class="notice-tax__result-title">关税明细：</h3>
          <div class="notice-tax__table-wrap">
            <table class="notice-tax__table">
              <thead>
                <tr>
                  <th scope="col">税号</th>
                  <th scope="col">品名及价格</th>
                  <th scope="col">单位</th>
                  <th scope="col">完税价格(人民币)</th>
                  <th scope="col">税率</th>
                </tr>
              </thead>
              <tbody data-tax-table-body />
            </table>
          </div>
          <p class="notice-tax__empty" data-tax-empty hidden>无符合条件的结果，请更换关键字重试</p>
          <div class="notice-tax__pager" data-tax-pager hidden>
            <button type="button" class="notice-tax__pager-btn" data-tax-pager-prev>上一页</button>
            <span class="notice-tax__pager-info" data-tax-pager-info />
            <button type="button" class="notice-tax__pager-btn" data-tax-pager-next>下一页</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
