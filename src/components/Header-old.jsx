const Header = ({children, data, headerClass = ''}) => { //TODO: check jsx factory for undefined?
	return <header class={`header is-active ${headerClass}`} data-elt="header">
		<div class="header__wrap">
			<div class="header__top">
				<div class="header__container">
					<div class="header__promo">
						<a href="https://themagma.ru" class="header__promo-link" target="_blank"><span>Magma — наша новая студия CG-дизайна</span></a>
					</div>
				</div>
			</div>

			<div class="header__main">
				<div class="header__container">
					<div class="header__box">
						<a href="/" class="header__logo" aria-label="ONY Agency">
							<svg class="svg-icon" viewBox="0 0 96 30" width="96" height="30"><use xlink:href="#svg-logo"></use></svg>
						</a>

						<div class="header__nav">
							<nav class="nav" data-elt="navHoverContainer">
								<div class="nav__wrap">
									<ul class="nav__list">
										<li class="nav__item nav__item--sub nav__item--services" data-elts="navHover">
											<div class="nav__link nav__link--title">
												<span>Услуги</span>
											</div>
											<div class="nav-submenu">
												<div class="nav-submenu__container">
													<div class="nav-submenu__wrap">
														<div class="nav-submenu__side">
															<a href="/all-services-and-approach" class="nav-submenu__link">
																<span>Все <i>услуги</i></span>
															</a>
														</div>
														<div class="nav-submenu__main">
															<div class="nav-submenu__block is-open">
																<a href="/branding" class="nav-submenu__title" data-elts="toggleNavMobile" data-param="branding">
																	<span>Брендинг</span>
																	<svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-plus"></use></svg>
																</a>
																<div class="nav-submenu__menu">
																	<ul class="nav-submenu__list">
																		<li class="nav-submenu__item nav-submenu__item--mob">
																			<a href="/branding" class="nav-submenu__link">
																				<span>О&nbsp;брендинге</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/design-audit" class="nav-submenu__link">
																				<span>Дизайн-аудит</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/brand-identity" class="nav-submenu__link">
																				<span>Бренд-айдентика</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
															<div class="nav-submenu__block">
																<a href="/digital" class="nav-submenu__title" data-elts="toggleNavMobile" data-param="digital">
																	<span>Диджитал</span>
																	<svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-plus"></use></svg>
																</a>
																<div class="nav-submenu__menu">
																	<ul class="nav-submenu__list">
																		<li class="nav-submenu__item nav-submenu__item--mob">
																			<a href="/digital" class="nav-submenu__link">
																				<span>О&nbsp;диджитал</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/ux-audit" class="nav-submenu__link">
																				<span>UX-аудит</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/product" class="nav-submenu__link">
																				<span>Продуктовые исследования</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/tech" class="nav-submenu__link">
																				<span>Цифровые продукты</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/ecom" class="nav-submenu__link">
																				<span>Интернет-магазины</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="/corp-web" class="nav-submenu__link">
																				<span>Корпоративные сайты</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
															<div class="nav-submenu__block">
																<a href="/strategy" class="nav-submenu__title" data-elts="toggleNavMobile" data-param="strategy">
																	<span>Cтратегия</span>
																	<svg class="svg-icon" viewBox="0 0 40 40" width="40" height="40"><use xlink:href="#svg-plus"></use></svg>
																</a>
																<div class="nav-submenu__menu">
																	<ul class="nav-submenu__list">
																		<li class="nav-submenu__item nav-submenu__item--mob">
																			<a href="/strategy" class="nav-submenu__link">
																				<span>О Signal (part of ONY)</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="https://signal.ony.ru/brand-architecture" target="_blank" class="nav-submenu__link">
																				<span>Бренд-архитектура</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="https://signal.ony.ru/positioning-and-platform-brand" target="_blank" class="nav-submenu__link">
																				<span>Позиционирование и&nbsp;платформа бренда</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="https://signal.ony.ru/evp-employer-brand-strategy" target="_blank" class="nav-submenu__link">
																				<span>EVP: стратегия бренда работодателя</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="https://signal.ony.ru/strategic-sessions" target="_blank" class="nav-submenu__link">
																				<span>Стратегические сессии</span>
																			</a>
																		</li>
																		<li class="nav-submenu__item">
																			<a href="https://signal.ony.ru/support-and-consulting" target="_blank" class="nav-submenu__link">
																				<span>Сопровождение и&nbsp;консалтинг</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</li>

										<li class="nav__item nav__item--sub" data-elts="navHover">
											<div class="nav__link nav__link--title">
												<span>Решения</span>
											</div>
											<div class="nav-submenu">
												<ul class="nav-submenu__list">
													<li class="nav-submenu__item">
														<a href="/multibrands" class="nav-submenu__link">
															<span>Решения для&nbsp;мультибрендов</span>
														</a>
													</li>
													<li class="nav-submenu__item">
														<a href="https://themagma.ru" class="nav-submenu__link">
															<span>CG-cтудия Magma</span>
														</a>
													</li>
												</ul>
											</div>
										</li>

										<li class="nav__item">
											<a href="/work" class="nav__link">
												<span>Проекты</span>
											</a>
										</li>

										<li class="nav__item nav__item--sub nav__item--about" data-elts="navHover">
											<div class="nav__link nav__link--title">
												<span>О нас</span>
											</div>

											<div class="nav-submenu">
												<ul class="nav-submenu__list">
													<li class="nav-submenu__item">
														<a href="/about-agency" class="nav-submenu__link">
															<span>Об&nbsp;агентстве</span>
														</a>
													</li>
													<li class="nav-submenu__item">
														<a href="https://join.ony.ru" class="nav-submenu__link">
															<span>Вакансии</span>
														</a>
													</li>
												</ul>
											</div>
										</li>

										<li class="nav__item">
											<a href="/contacts" class="nav__link">
												<span>Контакты</span>
											</a>
										</li>

										<li class="nav__item">
											<a href="https://en.ony.ru" class="nav__link">
												<span>En</span>
											</a>
										</li>
									</ul>

									{/* <div class="nav__button">
										<a href="/brief" class="button"><span>Консультация</span></a>
									</div> */}
									{/* <ul class="nav__list">
										<li class="nav__item nav__item--sub">
											<span class="nav__title">
												<span>Проекты</span>
											</span>

											<ul class="nav-submenu">
												<li class="nav-submenu__item"><a href="/work" class="nav-submenu__link"><span>Все проекты</span></a></li>
												<li class="nav-submenu__item"><a href="/work" class="nav-submenu__link"><span>Стратегия</span></a></li>
												<li class="nav-submenu__item"><a href="/work" class="nav-submenu__link"><span>Брендинг</span></a></li>
												<li class="nav-submenu__item"><a href="/work" class="nav-submenu__link"><span>Digital</span></a></li>
											</ul>
										</li>

										<li class="nav__item nav__item--sub">
											<span class="nav__title">
												<span>О нас</span>
											</span>

											<ul class="nav-submenu">
												<li class="nav-submenu__item"><a href="/about-agency" class="nav-submenu__link"><span>Об агентстве</span></a></li>
												<li class="nav-submenu__item"><a href="/all-services-and-approach" class="nav-submenu__link"><span>Услуги и подход</span></a></li>
												<li class="nav-submenu__item"><a href="https://join.ony.ru" class="nav-submenu__link"><span>Вакансии</span></a></li>
											</ul>
										</li>

										<li class="nav__item">
											<a href="/contacts" class="nav__link" data-elt="goNextPage"><span>Контакты</span></a>
										</li>
										<li class="nav__item">
											<a href="" class="nav__link"><span>En</span></a>
										</li>
									</ul> */}
								</div>
							</nav>
						</div>

						{children}

						{/* <a href="/consultation" class="header__button button"><span>Консультация</span></a> */}

						<button class="header__burger" data-elt="navToggle">
							<span></span><span></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>
};

export default Header;
